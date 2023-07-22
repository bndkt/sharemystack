create table stars (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  user_id uuid references auth.users,
  stack_id uuid references stacks,
  tool_id uuid references tools,
  category_id uuid references categories
);
alter table stars enable row level security;
create policy "Stars are viewable by everyone." on stars for
select using (true);
create policy "Users can insert their own stars." on stars for
insert with check (auth.uid() = user_id);
create policy "Users can delete their own stars." on stars for delete using (auth.uid() = user_id);
create policy "Users can update their own stars." on stars for
update using (auth.uid() = user_id);