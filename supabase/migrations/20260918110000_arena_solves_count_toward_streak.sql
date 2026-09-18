-- Counts an Arena solve as streak-worthy activity alongside lesson
-- completions, so a day spent only solving Arena challenges still keeps a
-- student's streak alive.
alter table public.arena_solved_challenges add column activity_date date;
update public.arena_solved_challenges set activity_date = solved_at::date where activity_date is null;
alter table public.arena_solved_challenges alter column activity_date set not null;

-- handle_lesson_completion() only ever reads new.user_id/new.activity_date,
-- so it's generic enough to reuse verbatim for arena solves — rename it to
-- reflect that instead of duplicating the same trigger logic under a second name.
alter function public.handle_lesson_completion() rename to handle_streak_activity;

create trigger on_arena_solve_insert
  after insert on public.arena_solved_challenges
  for each row execute procedure public.handle_streak_activity();

-- Repair function must also see arena activity, or recomputing a streak
-- from scratch would silently drop any days that were arena-only.
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
    select activity_date from public.lesson_completions where user_id = p_user_id
    union
    select activity_date from public.arena_solved_challenges where user_id = p_user_id
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
