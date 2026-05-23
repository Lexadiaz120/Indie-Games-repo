-- Запусти этот SQL в Supabase → SQL Editor

create table if not exists projects (
  id          bigserial primary key,
  title       text        not null,
  genre       text        not null,
  status      text        not null,
  score       int         not null default 3 check (score between 1 and 5),
  revenue     int         not null default 0,
  platform    text        not null,
  notes       text        not null default '',
  created_at  timestamptz not null default now()
);

-- Разрешить анонимный доступ (без авторизации)
alter table projects enable row level security;

create policy "public read"
  on projects for select using (true);

create policy "public insert"
  on projects for insert with check (true);

create policy "public update"
  on projects for update using (true);

create policy "public delete"
  on projects for delete using (true);
