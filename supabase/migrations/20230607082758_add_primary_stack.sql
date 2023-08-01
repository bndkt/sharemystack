alter table stacks
add primary_stack_id uuid references stacks null default null;