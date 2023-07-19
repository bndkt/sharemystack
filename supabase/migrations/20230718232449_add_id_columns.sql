alter table categorizations
add column id uuid not null default gen_random_uuid();