-- Denormalized cache of each student's streak, kept in sync by the trigger in
-- the next migration. lesson_completions is the source of truth; this table
-- exists purely so the streak badge (rendered on every page) is a cheap read.
create table public.streaks (
  user_id uuid primary key references auth.users (id) on delete cascade,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_activity_date date,
  updated_at timestamptz not null default now()
);

alter table public.streaks enable row level security;

create policy "Users can view their own streak"
  on public.streaks for select
  using (auth.uid() = user_id);

-- Deliberately no insert/update/delete policy for the client. Without this,
-- a student could PATCH their own current_streak to any value via
-- supabase-js directly. Only handle_lesson_completion() and recompute_streak()
-- (both SECURITY DEFINER, see next migration) may write to this table.
