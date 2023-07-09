create table
  stars (
    id uuid not null default gen_random_uuid(),
    user_id uuid references auth.users,
    stack_id uuid references stacks,
    tool_id uuid references tools,
    category_id uuid references categories,
    constraint stars_pkey primary key (id)
  );

alter table stars
  enable row level security;

create policy "Users can view their own stars."
  on stars for select 
  using ( auth.uid() = user_id );

create policy "Users can insert their own stars."
  on stars for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own stars."
  on stars for delete
  using ( auth.uid() = user_id );
