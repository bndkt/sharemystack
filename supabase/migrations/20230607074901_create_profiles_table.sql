create table profiles (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  server_created_at timestamp with time zone not null default now(),
  last_modified_at timestamp with time zone not null default now(),
  user_id uuid null default null references auth.users on delete cascade,
  name character varying null,
  slug character varying not null,
  unique (slug),
  description character varying null,
  image character varying null,
  website character varying null,
  twitter character varying null,
  twitter_image_url character varying null,
  youtube character varying null,
  is_featured boolean not null default false
);
alter table profiles enable row level security;
create policy "profiles are viewable by everyone." on profiles for
select using (true);
create policy "users can insert their own profile." on profiles for
insert with check (auth.uid() = user_id);
create policy "users can update their own profile." on profiles for
update using (auth.uid() = user_id);