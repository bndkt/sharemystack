CREATE TABLE stars (
  id uuid NOT NULL default gen_random_uuid(),
  PRIMARY KEY (id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE default NULL,
  server_created_at TIMESTAMP WITH TIME ZONE default NOW(),
  last_modified_at TIMESTAMP WITH TIME ZONE default NOW(),
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