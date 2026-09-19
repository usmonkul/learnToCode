-- recompute_streak() previously ran its `runs` CTE in one statement and then
-- selected from `runs` in a second one. A CTE only exists for the statement
-- that defines it, so the second select raised `relation "runs" does not
-- exist` and the repair function could never complete. Everything is now one
-- statement.
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
    (select streak_length from runs order by streak_end desc limit 1),
    (select streak_end from runs order by streak_end desc limit 1)
  into v_longest_streak, v_current_streak, v_last_activity_date
  from runs;

  insert into public.streaks (user_id, current_streak, longest_streak, last_activity_date, updated_at)
  values (p_user_id, coalesce(v_current_streak, 0), coalesce(v_longest_streak, 0), v_last_activity_date, now())
  on conflict (user_id) do update
    set current_streak = excluded.current_streak,
        longest_streak = excluded.longest_streak,
        last_activity_date = excluded.last_activity_date,
        updated_at = now();
end;
$$;

-- One-off repair: rebuild every student's streak from raw history, fixing rows
-- the trigger left behind.
select public.recompute_streak(user_id)
from (
  select user_id from public.lesson_completions
  union
  select user_id from public.arena_solved_challenges
) as active_users;
