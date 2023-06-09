create table
  stars (
    profile_id uuid references profiles,
    stack_id uuid references stacks,
    tool_id uuid references tools,
    category_id uuid references categories,
    primary key (profile_id, stack_id, tool_id, category_id)
  );

alter table stars
  enable row level security;
