CREATE TABLE stacks (
  id uuid NOT NULL default gen_random_uuid(),
  PRIMARY KEY (id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE default NULL,
  server_created_at TIMESTAMP WITH TIME ZONE default NOW(),
  last_modified_at TIMESTAMP WITH TIME ZONE default NOW(),
  name character varying null,
  slug character varying not null,
  constraint stacks_slug_key unique (slug),
  user_id uuid references auth.users,
  twitter character varying null,
  twitter_image_url character varying null,
  website character varying null,
  is_featured boolean not null default false
);
alter table stacks enable row level security;
create policy "Stacks are viewable by everyone." on stacks for
select using (true);
create policy "Users can insert their own stack." on stacks for
insert with check (auth.uid() = user_id);
create policy "Users can update their own stack." on stacks for
update using (auth.uid() = user_id);