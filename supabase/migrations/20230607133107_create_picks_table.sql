create table picks (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  server_created_at timestamp with time zone not null default now(),
  last_modified_at timestamp with time zone not null default now(),
  stack_id uuid references stacks on delete cascade,
  tool_id uuid references tools on delete cascade,
  category_id uuid references categories on delete cascade
);
alter table picks enable row level security;
create policy "Picks are viewable by everyone." on picks for
select using (true);
create policy "Users can insert picks for their own stack." on picks for
insert with check (
    (
      select count(*)
      from profiles
        left join stacks on stacks.profile_id = profiles.id
      where stacks.id = picks.stack_id
        and profiles.user_id = auth.uid()
    ) > 0
  );
create policy "Users can update picks for their own stack." on picks for
update using (
    (
      select count(*)
      from profiles
        left join stacks on stacks.profile_id = profiles.id
      where stacks.id = picks.stack_id
        and profiles.user_id = auth.uid()
    ) > 0
  ) with check (
    (
      select count(*)
      from profiles
        left join stacks on stacks.profile_id = profiles.id
      where stacks.id = picks.stack_id
        and profiles.user_id = auth.uid()
    ) > 0
  );
create policy "Users can delete picks from their own stack." on picks for delete using (
  (
    select count(*)
    from profiles
      left join stacks on stacks.profile_id = profiles.id
    where stacks.id = picks.stack_id
      and profiles.user_id = auth.uid()
  ) > 0
);