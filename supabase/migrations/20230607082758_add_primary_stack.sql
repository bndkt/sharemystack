alter table profiles
add primary_stack_id uuid references stacks null default null;