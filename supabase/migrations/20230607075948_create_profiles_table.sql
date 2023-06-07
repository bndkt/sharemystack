create table
  profiles (
    id uuid not null default gen_random_uuid() references auth.users on delete cascade,
    created_at timestamp with time zone not null default now(),
    constraint profiles_pkey primary key (id)
  );

alter table profiles
  enable row level security;

create policy "Profiles are viewable by everyone."
  on profiles for select using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );
