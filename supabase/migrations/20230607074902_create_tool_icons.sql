create table tool_icons (
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
  icon_svg text null
);
alter table tool_icons enable row level security;
create policy "tool icons are viewable by everyone." on tool_icons for
select using (true);