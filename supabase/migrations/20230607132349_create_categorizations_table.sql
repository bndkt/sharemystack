create table
  categorizations (
    tool_id uuid references tools,
    category_id uuid references categories,
    primary key (tool_id, category_id)
  );

alter table categorizations
  enable row level security;

create policy "Categorizations are viewable by everyone."
  on categorizations for select using ( true );
