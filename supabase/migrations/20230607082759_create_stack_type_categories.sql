create table stack_type_categories (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  server_created_at timestamp with time zone not null default now(),
  last_modified_at timestamp with time zone not null default now(),
  stack_type_id uuid references stack_types on delete cascade,
  category_id uuid references categories on delete cascade
);
alter table stack_type_categories enable row level security;
create policy "Stack type categories are viewable by everyone." on stack_type_categories for
select using (true);