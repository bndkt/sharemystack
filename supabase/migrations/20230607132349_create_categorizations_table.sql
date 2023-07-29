create table categorizations (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  server_created_at timestamp with time zone not null default now(),
  last_modified_at timestamp with time zone not null default now(),
  tool_id uuid references tools on delete cascade,
  category_id uuid references categories on delete cascade
);
alter table categorizations enable row level security;
create policy "Categorizations are viewable by everyone." on categorizations for
select using (true);