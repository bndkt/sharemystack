create table stacks (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  server_created_at timestamp with time zone not null default now(),
  last_modified_at timestamp with time zone not null default now(),
  profile_id uuid references profiles,
  stack_type_id uuid references stack_types,
  slug character varying null,
  unique (slug)
);
create unique index unique_index_stacks on stacks (profile_id, stack_type_id)
where deleted_at is null;
alter table stacks enable row level security;
create policy "stacks are viewable by everyone." on stacks for
select using (true);
create policy "users can insert their own stack." on stacks for
insert with check (
    (
      select count(*)
      from profiles
      where profiles.id = stacks.profile_id
        and profiles.user_id = auth.uid()
    ) > 0
  );
create policy "users can update their own stack." on stacks for
update using (
    (
      select count(*)
      from profiles
      where profiles.id = stacks.profile_id
        and profiles.user_id = auth.uid()
    ) > 0
  );