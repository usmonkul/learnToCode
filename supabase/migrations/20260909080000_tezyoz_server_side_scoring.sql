-- Close the "open devtools, insert a fake wpm" hole: wpm/accuracy for both
-- solo and race results are now computed server-side from the raw typed
-- string against the target text, instead of trusting client-submitted
-- numbers. Direct inserts into tezyoz.results are revoked; the two RPCs
-- below (running as SECURITY DEFINER, same pattern as start_race /
-- start_new_round) are the only way to write a result.

create or replace function tezyoz.compute_typing_score(
  p_raw_input text,
  p_target_text text,
  p_elapsed_ms integer,
  out wpm integer,
  out accuracy numeric,
  out correct_words integer,
  out total_words integer
)
language plpgsql
immutable
as $$
declare
  typed_words text[] := regexp_split_to_array(coalesce(p_raw_input, ''), ' ');
  target_words text[] := regexp_split_to_array(coalesce(p_target_text, ''), ' ');
  n int := coalesce(array_length(typed_words, 1), 0);
  t text;
  g text;
  len int;
  v_correct_words int := 0;
  v_correct_chars int := 0;
  v_total_chars int := 0;
  minutes numeric;
begin
  if trim(coalesce(p_raw_input, '')) = '' then
    n := 0;
  end if;

  for i in 1..n loop
    t := typed_words[i];
    g := coalesce(target_words[i], '');
    len := greatest(length(t), length(g));
    v_total_chars := v_total_chars + len;
    if t = g then
      v_correct_words := v_correct_words + 1;
    end if;
    for c in 1..len loop
      if substr(t, c, 1) = substr(g, c, 1) then
        v_correct_chars := v_correct_chars + 1;
      end if;
    end loop;
  end loop;

  minutes := greatest(p_elapsed_ms, 1) / 60000.0;
  wpm := round(v_correct_words / minutes)::integer;
  accuracy := case when v_total_chars = 0 then 100 else round((v_correct_chars::numeric / v_total_chars) * 100, 1) end;
  correct_words := v_correct_words;
  total_words := n;
end;
$$;

create or replace function tezyoz.submit_solo_result(
  p_mode text,
  p_config text,
  p_target_text text,
  p_raw_input text,
  p_elapsed_ms integer
)
returns tezyoz.results
language plpgsql
security definer set search_path = tezyoz
as $$
declare
  v_score record;
  v_result tezyoz.results;
begin
  if p_mode not in ('time', 'words', 'quote') then
    raise exception 'invalid mode: %', p_mode;
  end if;
  if p_elapsed_ms is null or p_elapsed_ms <= 0 or p_elapsed_ms > 30 * 60 * 1000 then
    raise exception 'invalid elapsed time';
  end if;
  -- Time mode has a fixed duration — the client can't have finished at any
  -- other elapsed time, so a mismatch here is a clear tamper signal.
  if p_mode = 'time' and abs(p_elapsed_ms - (p_config::integer * 1000)) > 1500 then
    raise exception 'elapsed time does not match time mode config';
  end if;

  select * into v_score from tezyoz.compute_typing_score(p_raw_input, p_target_text, p_elapsed_ms);

  insert into tezyoz.results (user_id, mode, config, wpm, accuracy, correct_words, total_words, source)
  values (auth.uid(), p_mode, p_config, v_score.wpm, v_score.accuracy, v_score.correct_words, v_score.total_words, 'solo')
  returning * into v_result;

  return v_result;
end;
$$;

grant execute on function tezyoz.submit_solo_result(text, text, text, text, integer) to authenticated;

create or replace function tezyoz.finish_race(
  p_room_id uuid,
  p_raw_input text,
  p_elapsed_ms integer
)
returns tezyoz.results
language plpgsql
security definer set search_path = tezyoz
as $$
declare
  v_room tezyoz.race_rooms;
  v_score record;
  v_result tezyoz.results;
begin
  select * into v_room from tezyoz.race_rooms where id = p_room_id;
  if v_room.id is null then
    raise exception 'race room not found';
  end if;

  if not exists (
    select 1 from tezyoz.race_participants
    where room_id = p_room_id and user_id = auth.uid()
  ) then
    raise exception 'you are not a participant in this race';
  end if;

  if p_elapsed_ms is null or p_elapsed_ms <= 0 or p_elapsed_ms > 30 * 60 * 1000 then
    raise exception 'invalid elapsed time';
  end if;

  -- target_text comes from the room row, not the client, so (unlike solo)
  -- there's no way to race against an easier text than everyone else saw.
  select * into v_score from tezyoz.compute_typing_score(p_raw_input, v_room.target_text, p_elapsed_ms);

  update tezyoz.race_participants
    set status = 'finished',
        finished_at = now(),
        progress = length(v_room.target_text),
        wpm = v_score.wpm,
        accuracy = v_score.accuracy
    where room_id = p_room_id and user_id = auth.uid();

  insert into tezyoz.results (user_id, mode, config, wpm, accuracy, correct_words, total_words, source, race_room_id)
  values (auth.uid(), v_room.mode, v_room.config, v_score.wpm, v_score.accuracy, v_score.correct_words, v_score.total_words, 'race', p_room_id)
  returning * into v_result;

  return v_result;
end;
$$;

grant execute on function tezyoz.finish_race(uuid, text, integer) to authenticated;

-- Results can now only be written through the RPCs above.
revoke insert on tezyoz.results from authenticated;

-- Block a direct client update from ever setting status to 'finished' (or
-- forging wpm/accuracy along with it) — only finish_race (SECURITY DEFINER,
-- bypasses RLS) can do that. Live progress ticks (status stays 'racing')
-- are untouched.
drop policy "Players update their own race progress" on tezyoz.race_participants;
create policy "Players update their own race progress"
  on tezyoz.race_participants for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id and status in ('joined', 'racing'));
