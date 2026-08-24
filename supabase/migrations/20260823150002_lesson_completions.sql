create table public.lesson_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  lesson_slug text not null,
  completed_at timestamptz not null default now(),
  -- The student's own local calendar date, sent by the client. Never derived
  -- server-side — that would silently guess the student's timezone.
  activity_date date not null,
  unique (user_id, course_id, lesson_slug)
);

create index lesson_completions_user_course_idx
  on public.lesson_completions (user_id, course_id);

alter table public.lesson_completions enable row level security;

create policy "Users can view their own lesson completions"
  on public.lesson_completions for select
  using (auth.uid() = user_id);

create policy "Users can mark their own lessons complete"
  on public.lesson_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can undo their own lesson completions"
  on public.lesson_completions for delete
  using (auth.uid() = user_id);
