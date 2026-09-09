-- Adds tezyoz.yaratuvchi.uz support to the shared Supabase project:
-- a public, unique username on profiles (leaderboard/race identity,
-- distinct from the non-unique OAuth-derived display_name), a public
-- read policy so opponents/leaderboard entries can be shown by name,
-- and a dedicated schema for tezyoz's own tables.

alter table public.profiles
  add column username text;

create unique index profiles_username_lower_idx
  on public.profiles (lower(username))
  where username is not null;

create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create schema if not exists tezyoz;

grant usage on schema tezyoz to anon, authenticated;
