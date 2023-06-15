create table
  stacks (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    user_id uuid references auth.users,
    name character varying null,
    slug character varying not null default gen_random_uuid(),
    twitter character varying null,
    twitter_image_url character varying null,
    website character varying null,
    featured boolean not null default false,
    updated_at timestamp with time zone not null default now(),
    constraint stacks_pkey primary key (id),
    constraint stacks_slug_key unique (slug)
  );

alter table stacks
  enable row level security;

create policy "Stacks are viewable by everyone."
  on stacks for select using ( true );

create policy "Users can insert their own stack."
  on stacks for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own stack."
  on stacks for update
  using ( auth.uid() = user_id );
