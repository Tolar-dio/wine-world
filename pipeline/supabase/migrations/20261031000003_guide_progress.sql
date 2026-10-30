-- Vitis Mundi: progress through the guided Paths (one row per user and guide)
create table public.guide_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  guide_id text not null check (char_length(guide_id) between 1 and 80),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (user_id, guide_id)
);
alter table public.guide_progress enable row level security;
create policy "guide_progress select own" on public.guide_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "guide_progress insert own" on public.guide_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "guide_progress update own" on public.guide_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "guide_progress delete own" on public.guide_progress for delete to authenticated using ((select auth.uid()) = user_id);
create index guide_progress_user_idx on public.guide_progress (user_id);
