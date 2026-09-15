create table public.arena_solved_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id text not null,
  challenge_slug text not null,
  solved_at timestamptz not null default now(),
  unique (user_id, topic_id, challenge_slug)
);

create index arena_solved_challenges_user_topic_idx
  on public.arena_solved_challenges (user_id, topic_id);

alter table public.arena_solved_challenges enable row level security;

create policy "Users can view their own solved challenges"
  on public.arena_solved_challenges for select
  using (auth.uid() = user_id);

create policy "Users can mark their own challenges solved"
  on public.arena_solved_challenges for insert
  with check (auth.uid() = user_id);
