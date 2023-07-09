create table
  tools (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    name character varying not null,
    slug character varying not null,
    color character varying null,
    icon text null,
    website character varying null,
    twitter character varying null,
    constraint tools_pkey primary key (id),
    constraint tools_slug_key unique (slug)
  );

alter table tools
  enable row level security;

create policy "Tools are viewable by everyone."
  on tools for select using ( true );
