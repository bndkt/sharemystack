CREATE TABLE categorizations (
  id uuid NOT NULL default gen_random_uuid(),
  PRIMARY KEY (id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE default NULL,
  server_created_at TIMESTAMP WITH TIME ZONE default NOW(),
  last_modified_at TIMESTAMP WITH TIME ZONE default NOW(),
  tool_id uuid references tools,
  category_id uuid references categories
);
alter table categorizations enable row level security;
create policy "Categorizations are viewable by everyone." on categorizations for
select using (true);