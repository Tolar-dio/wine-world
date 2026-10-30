-- Flags on atlas photos (wrong place, irrelevant, low quality), written by signed-in viewers; each user sees only their own flags.
create table public.photo_flags (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  target_id   text not null,
  file        text not null,
  verdict     text not null default 'wrong' check (verdict in ('wrong','irrelevant','poor','good')),
  note        text,
  created_at  timestamptz not null default now(),
  unique (user_id, target_id, file)
);
create index photo_flags_user_idx on public.photo_flags (user_id);
alter table public.photo_flags enable row level security;
create policy photo_flags_owner_select on public.photo_flags for select to authenticated using ((select auth.uid()) = user_id);
create policy photo_flags_owner_insert on public.photo_flags for insert to authenticated with check ((select auth.uid()) = user_id);
create policy photo_flags_owner_update on public.photo_flags for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy photo_flags_owner_delete on public.photo_flags for delete to authenticated using ((select auth.uid()) = user_id);
