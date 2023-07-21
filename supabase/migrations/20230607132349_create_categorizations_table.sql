create table categorizations (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  tool_id uuid references tools,
  category_id uuid references categories
);
alter table categorizations enable row level security;
create policy "Categorizations are viewable by everyone." on categorizations for
select using (true);