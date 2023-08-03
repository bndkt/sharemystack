create table stars (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  server_created_at timestamp with time zone not null default now(),
  last_modified_at timestamp with time zone not null default now(),
  user_id uuid references auth.users,
  profile_id uuid references profiles,
  tool_id uuid references tools,
  category_id uuid references categories
);
alter table stars enable row level security;
create policy "stars are viewable by everyone." on stars for
select using (true);
create policy "users can insert their own stars." on stars for
insert with check (auth.uid() = user_id);
create policy "users can delete their own stars." on stars for delete using (auth.uid() = user_id);
create policy "users can update their own stars." on stars for
update using (auth.uid() = user_id);