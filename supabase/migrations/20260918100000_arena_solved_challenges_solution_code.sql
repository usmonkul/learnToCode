alter table public.arena_solved_challenges
  add column solution_code text;

create policy "Users can update their own solved challenges"
  on public.arena_solved_challenges for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
