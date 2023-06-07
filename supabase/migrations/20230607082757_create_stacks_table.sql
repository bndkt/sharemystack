create table
  stacks (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    name character varying not null,
    slug character varying not null,
    twitter character varying null,
    website character varying null,
    constraint stacks_pkey primary key (id),
    constraint stacks_slug_key unique (slug)
  );

alter table stacks
  enable row level security;

create policy "Stacks are viewable by everyone."
  on stacks for select using ( true );

create policy "Users can insert their own stack."
  on stacks for insert
  with check ( auth.uid() = id );

create policy "Users can update their own stack."
  on stacks for update
  using ( auth.uid() = id );
