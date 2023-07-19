alter table tools
add column updated_at timestamp with time zone not null default now(),
    add column deleted_at timestamp with time zone default null;
alter table categories
add column updated_at timestamp with time zone not null default now(),
    add column deleted_at timestamp with time zone default null;
alter table categorizations
add column updated_at timestamp with time zone not null default now(),
    add column deleted_at timestamp with time zone default null;
alter table stacks
add column deleted_at timestamp with time zone default null;
alter table picks
add column created_at timestamp with time zone not null default now(),
    add column updated_at timestamp with time zone not null default now(),
    add column deleted_at timestamp with time zone default null;
alter table stars
add column updated_at timestamp with time zone not null default now(),
    add column deleted_at timestamp with time zone default null;