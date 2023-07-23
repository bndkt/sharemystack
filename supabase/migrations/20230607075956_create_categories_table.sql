CREATE TABLE categories (
  id uuid NOT NULL default gen_random_uuid(),
  PRIMARY KEY (id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE default NULL,
  server_created_at TIMESTAMP WITH TIME ZONE default NOW(),
  last_modified_at TIMESTAMP WITH TIME ZONE default NOW(),
  name character varying not null,
  slug character varying not null,
  constraint categories_slug_key unique (slug),
  icon character varying not null,
  is_coming_soon boolean not null default false
);
alter table categories enable row level security;
create policy "Categories are viewable by everyone." on categories for
select using (true);