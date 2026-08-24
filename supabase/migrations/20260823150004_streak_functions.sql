-- Keeps public.streaks in sync whenever a lesson is marked complete.
-- Uses activity_date (the client's own local "today", see lesson_completions)
-- rather than any server-side notion of "today" — this function only ever
-- compares dates it's handed, it never guesses a timezone.
create or replace function public.handle_lesson_completion()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_last_activity_date date;
  v_current_streak int;
  v_longest_streak int;
begin
  select last_activity_date, current_streak, longest_streak
    into v_last_activity_date, v_current_streak, v_longest_streak
    from public.streaks
    where user_id = new.user_id
    for update;

  if not found then
    insert into public.streaks (user_id, current_streak, longest_streak, last_activity_date)
    values (new.user_id, 1, 1, new.activity_date);
    return new;
  end if;

  if new.activity_date = v_last_activity_date then
    -- A second lesson completed on a date already recorded — no change.
    return new;
  elsif new.activity_date = v_last_activity_date + 1 then
    v_current_streak := v_current_streak + 1;
  elsif new.activity_date > v_last_activity_date + 1 then
    -- Gap since the last recorded activity — streak resets.
    v_current_streak := 1;
  else
    -- new.activity_date is earlier than what's on record (backfill, or a
    -- second device with clock skew). A naive increment/reset here could
    -- corrupt the count, so leave it untouched — call recompute_streak()
    -- to repair from raw history instead.
    return new;
  end if;

  update public.streaks
    set current_streak = v_current_streak,
        longest_streak = greatest(v_longest_streak, v_current_streak),
        last_activity_date = greatest(v_last_activity_date, new.activity_date),
        updated_at = now()
    where user_id = new.user_id;

  return new;
end;
$$;

create trigger on_lesson_completion_insert
  after insert on public.lesson_completions
  for each row execute procedure public.handle_lesson_completion();

-- Correctness escape hatch: rebuilds a user's streak from scratch off the raw
-- lesson_completions history (gaps-and-islands over distinct activity_date
-- values). Call this to repair drift the trigger above deliberately declines
-- to guess at (out-of-order writes, multi-device backfills).
create or replace function public.recompute_streak(p_user_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_current_streak int := 0;
  v_longest_streak int := 0;
  v_last_activity_date date;
begin
  with distinct_dates as (
    select distinct activity_date
    from public.lesson_completions
    where user_id = p_user_id
  ),
  islands as (
    select
      activity_date,
      activity_date - (row_number() over (order by activity_date))::int as island_key
    from distinct_dates
  ),
  runs as (
    select
      max(activity_date) as streak_end,
      count(*) as streak_length
    from islands
    group by island_key
  )
  select
    coalesce(max(streak_length), 0),
    (select streak_end from runs order by streak_end desc limit 1)
  into v_longest_streak, v_last_activity_date
  from runs;

  select streak_length into v_current_streak
  from runs
  where streak_end = v_last_activity_date;

  insert into public.streaks (user_id, current_streak, longest_streak, last_activity_date, updated_at)
  values (p_user_id, coalesce(v_current_streak, 0), coalesce(v_longest_streak, 0), v_last_activity_date, now())
  on conflict (user_id) do update
    set current_streak = excluded.current_streak,
        longest_streak = excluded.longest_streak,
        last_activity_date = excluded.last_activity_date,
        updated_at = now();
end;
$$;
