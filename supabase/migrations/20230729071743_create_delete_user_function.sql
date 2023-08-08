create or replace function delete_user() returns void as $$ begin -- delete picks
update picks
set deleted_at = now(),
    last_modified_at = now()
from stacks,
    profiles
where picks.stack_id = stacks.id
    and stacks.profile_id = profiles.id
    and profiles.user_id = auth.uid();
-- delete stacks
update stacks
set deleted_at = now(),
    last_modified_at = now()
from profiles
where stacks.profile_id = profiles.id
    and profiles.user_id = auth.uid();
-- delete profile
update profiles
set deleted_at = now(),
    last_modified_at = now()
where user_id = auth.uid();
-- delete stars
update stars
set deleted_at = now(),
    last_modified_at = now()
where user_id = auth.uid();
delete from auth.users
where id = auth.uid();
end;
$$ language plpgsql security definer;