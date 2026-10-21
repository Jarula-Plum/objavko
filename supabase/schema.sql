-- Objavko: databáza pre učiteľky, triedy, žiakov a výsledky hier.
-- Spusti v Supabase: SQL Editor → New query → vlož celý súbor → Run.
--
-- GDPR: o deťoch ukladáme len krstné meno alebo prezývku a ikonku.
-- Každá učiteľka vidí iba svoje triedy (Row Level Security).

create table if not exists public.classes (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name        text not null check (char_length(name) between 1 and 40),
  created_at  timestamptz not null default now()
);

create table if not exists public.children (
  id          uuid primary key default gen_random_uuid(),
  class_id    uuid not null references public.classes (id) on delete cascade,
  name        text not null check (char_length(name) between 1 and 24),
  avatar      text not null default '🐻',
  created_at  timestamptz not null default now()
);

create table if not exists public.results (
  id          bigint generated always as identity primary key,
  child_id    uuid not null references public.children (id) on delete cascade,
  game_id     text not null,
  stars       smallint not null check (stars between 1 and 3),
  played_at   timestamptz not null default now()
);

create index if not exists classes_owner_idx on public.classes (owner_id);
create index if not exists children_class_idx on public.children (class_id);
create index if not exists results_child_idx on public.results (child_id);

alter table public.classes  enable row level security;
alter table public.children enable row level security;
alter table public.results  enable row level security;

drop policy if exists "own classes" on public.classes;
create policy "own classes" on public.classes
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

drop policy if exists "children of own classes" on public.children;
create policy "children of own classes" on public.children
  for all using (
    exists (select 1 from public.classes c where c.id = class_id and c.owner_id = auth.uid())
  ) with check (
    exists (select 1 from public.classes c where c.id = class_id and c.owner_id = auth.uid())
  );

drop policy if exists "results of own children" on public.results;
create policy "results of own children" on public.results
  for all using (
    exists (
      select 1 from public.children ch join public.classes c on c.id = ch.class_id
      where ch.id = child_id and c.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.children ch join public.classes c on c.id = ch.class_id
      where ch.id = child_id and c.owner_id = auth.uid()
    )
  );
