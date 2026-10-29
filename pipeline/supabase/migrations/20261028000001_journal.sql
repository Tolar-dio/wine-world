-- Vitis Mundi: personal cellar journal, notes, lists and study progress.
-- Every row belongs to one signed-in user; row-level security restricts all access to the owner.

create extension if not exists pgcrypto;

-- Shared trigger to keep updated_at current
create or replace function public.vm_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- Bottles: tasted wines, cellar stock and wishlist wines
create table if not exists public.bottles (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  status           text not null default 'tasted' check (status in ('tasted','cellar','wishlist')),
  wine             text not null,                 -- label / cuvée name
  producer         text,
  vintage          int check (vintage between 1700 and 2100), -- null = non-vintage
  appellation_id   text,                          -- Vitis Mundi id, e.g. 'fr-sauternes'
  appellation_name text,
  site_id          text,                          -- optional cru / vineyard / estate id
  region_id        text,
  country          text,                          -- iso2 lowercase
  style            text check (style in ('red','white','rose','sparkling','sweet','fortified','orange')),
  grapes           text[] not null default '{}',  -- grape ids from grapes.json
  classification   text,                          -- e.g. 'Premier Cru Classé (1855)', '6 Puttonyos'
  tasted_on        date,
  where_tasted     text,
  occasion         text,
  with_whom        text,
  price            numeric(10,2),
  currency         text default 'USD',
  bottle_ml        int default 750,
  quantity         int not null default 1 check (quantity >= 0), -- cellar count
  drink_from       int,
  drink_to         int,
  rating           numeric(4,1) check (rating is null or (rating >= 50 and rating <= 100)), -- 100-point scale
  would_buy_again  boolean,
  sat              jsonb not null default '{}'::jsonb,   -- WSET-style structured tasting (see frontend journal module)
  notes            text,
  photo_path       text                           -- object path in storage bucket 'labels'
);
create index if not exists bottles_user_idx on public.bottles (user_id, tasted_on desc);
create index if not exists bottles_app_idx  on public.bottles (user_id, appellation_id);

-- Free-form notes pinned to anything on the map
create table if not exists public.place_notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  target_type text not null check (target_type in ('country','region','appellation','site','grape','event','soil','term')),
  target_id   text not null,
  body        text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, target_type, target_id)
);

-- Lists: places visited / to visit, appellations to taste
create table if not exists public.place_lists (
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  list        text not null check (list in ('visited','want_to_visit','want_to_taste','favourite')),
  target_type text not null,
  target_id   text not null,
  note        text,
  created_at  timestamptz not null default now(),
  primary key (user_id, list, target_type, target_id)
);

-- Spaced-repetition state per study card
create table if not exists public.study_cards (
  user_id       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  card_id       text not null,
  deck          text not null,
  ease          real not null default 2.5,
  interval_days real not null default 0,
  reps          int  not null default 0,
  lapses        int  not null default 0,
  due_at        timestamptz not null default now(),
  last_result   smallint,
  updated_at    timestamptz not null default now(),
  primary key (user_id, card_id)
);
create index if not exists study_cards_due_idx on public.study_cards (user_id, deck, due_at);

create table if not exists public.study_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  deck        text not null,
  mode        text,
  started_at  timestamptz not null default now(),
  finished_at timestamptz,
  correct     int not null default 0,
  total       int not null default 0
);

-- Saved map filters
create table if not exists public.saved_filters (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name       text not null,
  spec       jsonb not null,
  created_at timestamptz not null default now()
);

-- updated_at triggers
drop trigger if exists bottles_touch on public.bottles;
create trigger bottles_touch before update on public.bottles for each row execute function public.vm_touch_updated_at();
drop trigger if exists place_notes_touch on public.place_notes;
create trigger place_notes_touch before update on public.place_notes for each row execute function public.vm_touch_updated_at();
drop trigger if exists study_cards_touch on public.study_cards;
create trigger study_cards_touch before update on public.study_cards for each row execute function public.vm_touch_updated_at();

-- Row-level security: owner-only access on every table
do $$
declare t text;
begin
  foreach t in array array['bottles','place_notes','place_lists','study_cards','study_sessions','saved_filters'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %I on public.%I', t || '_owner_select', t);
    execute format('drop policy if exists %I on public.%I', t || '_owner_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_owner_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_owner_delete', t);
    execute format('create policy %I on public.%I for select to authenticated using ((select auth.uid()) = user_id)', t || '_owner_select', t);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = user_id)', t || '_owner_insert', t);
    execute format('create policy %I on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', t || '_owner_update', t);
    execute format('create policy %I on public.%I for delete to authenticated using ((select auth.uid()) = user_id)', t || '_owner_delete', t);
  end loop;
end $$;

-- Private storage bucket for label photos; each user writes only under their own folder: '<uid>/<file>'
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('labels', 'labels', false, 8388608, array['image/jpeg','image/png','image/webp','image/heic'])
on conflict (id) do nothing;

drop policy if exists labels_owner_select on storage.objects;
drop policy if exists labels_owner_insert on storage.objects;
drop policy if exists labels_owner_update on storage.objects;
drop policy if exists labels_owner_delete on storage.objects;
create policy labels_owner_select on storage.objects for select to authenticated
  using (bucket_id = 'labels' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy labels_owner_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'labels' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy labels_owner_update on storage.objects for update to authenticated
  using (bucket_id = 'labels' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy labels_owner_delete on storage.objects for delete to authenticated
  using (bucket_id = 'labels' and (storage.foldername(name))[1] = (select auth.uid())::text);
