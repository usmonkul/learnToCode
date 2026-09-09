-- Host-only race room actions, as SECURITY DEFINER functions rather than
-- broader RLS update policies — a host starting or resetting a room needs to
-- touch every participant's row, not just their own, and checking `host_id =
-- auth.uid()` inside the function keeps that power scoped to exactly this
-- action instead of opening general cross-user updates on race_participants.

create or replace function tezyoz.start_race(p_room_id uuid)
returns void
language plpgsql
security definer set search_path = tezyoz
as $$
begin
  update tezyoz.race_rooms
    set status = 'racing', started_at = now()
    where id = p_room_id
      and host_id = auth.uid()
      and status = 'lobby';

  if not found then
    raise exception 'only the host can start a race that is still in its lobby';
  end if;
end;
$$;

grant execute on function tezyoz.start_race(uuid) to authenticated;

-- Rematch: same room/code, a fresh text, everyone back to the lobby so the
-- host has to click "start" again (no auto-countdown-on-reset either).
create or replace function tezyoz.start_new_round(p_room_id uuid, p_target_text text)
returns void
language plpgsql
security definer set search_path = tezyoz
as $$
begin
  update tezyoz.race_rooms
    set status = 'lobby', target_text = p_target_text, started_at = null
    where id = p_room_id and host_id = auth.uid();

  if not found then
    raise exception 'only the host can start a new round';
  end if;

  update tezyoz.race_participants
    set status = 'joined', progress = 0, finished_at = null, wpm = null, accuracy = null
    where room_id = p_room_id;
end;
$$;

grant execute on function tezyoz.start_new_round(uuid, text) to authenticated;
