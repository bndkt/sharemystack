alter table categorizations
add column id uuid not null default gen_random_uuid();
alter table picks
add column id uuid not null default gen_random_uuid();