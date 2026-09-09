-- tezyoz.yaratuvchi.uz core tables: race rooms, race participants, and
-- solo/race results (which the per-mode+config leaderboard is read from).
-- Lives in the shared Supabase project's `tezyoz` schema (created in
-- 20260909050454_tezyoz_profile_username.sql), separate from Course-books'
-- public schema.

-- ---------------------------------------------------------------------------
-- Race rooms
-- ---------------------------------------------------------------------------

create table tezyoz.race_rooms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  host_id uuid not null references public.profiles (id) on delete cascade,
  -- Only Words/Quote are raceable (natural finish line); Time is solo-only.
  mode text not null check (mode in ('words', 'quote')),
  config text not null,
  status text not null default 'lobby' check (status in ('lobby', 'racing', 'finished')),
  -- The exact words/quote text locked in for the room so every racer sees
  -- identical content — generated once, reused as-is on rematch's new round.
  target_text text,
  created_at timestamptz not null default now(),
  started_at timestamptz
);

alter table tezyoz.race_rooms enable row level security;

-- Rooms are private-by-code (not listed anywhere), so a public select policy
-- doesn't leak them in practice — clients only ever look one up by its code.
create policy "Race rooms are viewable by everyone"
  on tezyoz.race_rooms for select
  using (true);

create policy "Hosts create their own race rooms"
  on tezyoz.race_rooms for insert
  with check (auth.uid() = host_id);

create policy "Hosts update their own race rooms"
  on tezyoz.race_rooms for update
  using (auth.uid() = host_id)
  with check (auth.uid() = host_id);

-- ---------------------------------------------------------------------------
-- Race participants
-- ---------------------------------------------------------------------------

create table tezyoz.race_participants (
  room_id uuid not null references tezyoz.race_rooms (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  finished_at timestamptz,
  wpm integer check (wpm >= 0 and wpm <= 350),
  accuracy numeric(5, 1) check (accuracy >= 0 and accuracy <= 100),
  -- Characters typed so far, for the live progress bar.
  progress integer not null default 0,
  status text not null default 'joined' check (status in ('joined', 'racing', 'finished', 'dnf')),
  primary key (room_id, user_id)
);

create index race_participants_room_idx on tezyoz.race_participants (room_id);

alter table tezyoz.race_participants enable row level security;

create policy "Race participants are viewable by everyone"
  on tezyoz.race_participants for select
  using (true);

create policy "Players join races as themselves"
  on tezyoz.race_participants for insert
  with check (auth.uid() = user_id);

create policy "Players update their own race progress"
  on tezyoz.race_participants for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Players can leave a room before it starts"
  on tezyoz.race_participants for delete
  using (
    auth.uid() = user_id
    and exists (
      select 1 from tezyoz.race_rooms
      where id = room_id and status = 'lobby'
    )
  );

-- Hard cap of 8 players per room and no joining a room that already started —
-- enforced server-side since the client's own count is easy to race/spoof.
create or replace function tezyoz.enforce_race_room_capacity()
returns trigger
language plpgsql
security definer set search_path = tezyoz
as $$
declare
  v_status text;
  v_count int;
begin
  select status into v_status from tezyoz.race_rooms where id = new.room_id;

  if v_status is null then
    raise exception 'Race room % does not exist', new.room_id;
  elsif v_status <> 'lobby' then
    raise exception 'Race room % is not accepting new players', new.room_id;
  end if;

  select count(*) into v_count from tezyoz.race_participants where room_id = new.room_id;
  if v_count >= 8 then
    raise exception 'Race room % is full', new.room_id;
  end if;

  return new;
end;
$$;

create trigger enforce_race_room_capacity_before_insert
  before insert on tezyoz.race_participants
  for each row execute procedure tezyoz.enforce_race_room_capacity();

-- ---------------------------------------------------------------------------
-- Results (solo + race — one shared table, since race results count toward
-- the same leaderboard as solo ones)
-- ---------------------------------------------------------------------------

create table tezyoz.results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  mode text not null check (mode in ('time', 'words', 'quote')),
  config text not null,
  -- Light anti-cheat: a server-side sanity cap, not full keystroke-replay
  -- validation (out of scope for v1).
  wpm integer not null check (wpm >= 0 and wpm <= 350),
  accuracy numeric(5, 1) not null check (accuracy >= 0 and accuracy <= 100),
  correct_words integer not null default 0,
  total_words integer not null default 0,
  source text not null default 'solo' check (source in ('solo', 'race')),
  race_room_id uuid references tezyoz.race_rooms (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint results_race_room_matches_source check (
    (source = 'race' and race_room_id is not null)
    or (source = 'solo' and race_room_id is null)
  )
);

-- Leaderboard reads: best scores for a given mode+config, highest WPM first.
create index results_mode_config_wpm_idx on tezyoz.results (mode, config, wpm desc);
create index results_user_idx on tezyoz.results (user_id);

alter table tezyoz.results enable row level security;

create policy "Results are viewable by everyone"
  on tezyoz.results for select
  using (true);

create policy "Users record their own results"
  on tezyoz.results for insert
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Leaderboard: each player's best result per mode+config, all-time (no
-- daily/weekly resets), ties broken by accuracy then earliest submission.
-- ---------------------------------------------------------------------------

create view tezyoz.leaderboard as
select distinct on (r.mode, r.config, r.user_id)
  r.mode,
  r.config,
  r.user_id,
  p.username,
  r.wpm,
  r.accuracy,
  r.created_at
from tezyoz.results r
join public.profiles p on p.id = r.user_id
order by r.mode, r.config, r.user_id, r.wpm desc, r.accuracy desc, r.created_at asc;

-- ---------------------------------------------------------------------------
-- Grants (schema-level `usage` was already granted in
-- 20260909050454_tezyoz_profile_username.sql; table/view privileges are
-- separate from RLS policies and must be granted explicitly). Guests (anon)
-- can read everything but never write — saving a score or joining/hosting a
-- race requires sign-in, per the hybrid auth model.
-- ---------------------------------------------------------------------------

grant select on tezyoz.race_rooms, tezyoz.race_participants, tezyoz.results, tezyoz.leaderboard
  to anon, authenticated;

grant insert, update on tezyoz.race_rooms to authenticated;
grant insert, update, delete on tezyoz.race_participants to authenticated;
grant insert on tezyoz.results to authenticated;

-- ---------------------------------------------------------------------------
-- Realtime: live progress bars and room status need push updates, not polling.
-- ---------------------------------------------------------------------------

alter publication supabase_realtime add table tezyoz.race_rooms;
alter publication supabase_realtime add table tezyoz.race_participants;
