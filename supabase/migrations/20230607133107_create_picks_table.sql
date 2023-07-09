create table
  picks (
    stack_id uuid references stacks,
    tool_id uuid references tools,
    category_id uuid references categories,
    primary key (stack_id, tool_id, category_id)
  );

alter table picks
  enable row level security;

create policy "Picks are viewable by everyone."
  on picks for select
  using ( true );

create policy "Users can insert picks for their own stack."
  on picks for insert
  with check ( 
    (select count(*) from stacks where stacks.id = picks.stack_id AND stacks.user_id = auth.uid()) > 0
  );

create policy "Users can delete picks from their own stack."
  on picks
  for delete
  using ( 
    (select count(*) from stacks where stacks.id = picks.stack_id AND stacks.user_id = auth.uid()) > 0
  );
