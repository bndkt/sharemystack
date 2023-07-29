create table stack_types (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  server_created_at timestamp with time zone not null default now(),
  last_modified_at timestamp with time zone not null default now(),
  name character varying not null,
  slug character varying not null,
  unique (slug),
  icon character varying not null,
  is_coming_soon boolean not null default false
);
alter table stack_types enable row level security;
create policy "Stack types are viewable by everyone." on stack_types for
select using (true);