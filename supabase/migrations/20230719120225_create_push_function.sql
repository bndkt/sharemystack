--select (changes->'picks'->'created') as picks_created,
--(changes->'picks'->'deleted') as picks_deleted,
--(changes->'picks'->'updated') as picks_updated
create or replace function push(changes jsonb) returns void as $$
declare new_profile jsonb;
declare updated_profile jsonb;
begin -- insert new profiles
for new_profile in
select jsonb_array_elements((changes->'profiles'->'created')) loop perform create_profile(
        (new_profile->>'id')::uuid,
        (new_profile->>'name'),
        (new_profile->>'slug'),
        epoch_to_timestamp(new_profile->>'created_at'),
        epoch_to_timestamp(new_profile->>'updated_at')
    );
end loop;
-- delete profiles
with changes_data as (
    select jsonb_array_elements_text(changes->'profiles'->'deleted')::uuid as deleted
)
update profiles
set deleted_at = now(),
    last_modified_at = now()
from changes_data
where profiles.id = changes_data.deleted;
-- insert new picks
with changes_data as (
    select (changes->'picks'->'created') as picks_created
)
insert into picks (
        id,
        stack_id,
        tool_id,
        category_id,
        created_at,
        updated_at,
        server_created_at,
        last_modified_at
    )
select (category->>'id')::uuid,
    (category->>'stack_id')::uuid,
    (category->>'tool_id')::uuid,
    (category->>'category_id')::uuid,
    epoch_to_timestamp(category->>'created_at'),
    epoch_to_timestamp(category->>'updated_at'),
    now(),
    now()
from changes_data,
    jsonb_array_elements(picks_created) as category;
-- delete picks
with changes_data as (
    select jsonb_array_elements_text(changes->'picks'->'deleted')::uuid as deleted
)
update picks
set deleted_at = now(),
    last_modified_at = now()
from changes_data
where picks.id = changes_data.deleted;
-- insert new stacks
with changes_data as (
    select (changes->'stacks'->'created') as stacks_created
)
insert into stacks (
        id,
        profile_id,
        stack_type_id,
        created_at,
        updated_at,
        server_created_at,
        last_modified_at
    )
select (stack->>'id')::uuid,
    (stack->>'profile_id')::uuid,
    (stack->>'stack_type_id')::uuid,
    epoch_to_timestamp(stack->>'created_at'),
    epoch_to_timestamp(stack->>'updated_at'),
    now(),
    now()
from changes_data,
    jsonb_array_elements(stacks_created) as stack;
-- delete stacks
with changes_data as (
    select jsonb_array_elements_text(changes->'stacks'->'deleted')::uuid as deleted
)
update stacks
set deleted_at = now(),
    last_modified_at = now()
from changes_data
where stacks.id = changes_data.deleted;
-- insert new stars
with changes_data as (
    select (changes->'stars'->'created') as stars_created
)
insert into stars (
        id,
        profile_id,
        user_id,
        created_at,
        updated_at,
        server_created_at,
        last_modified_at
    )
select (star->>'id')::uuid,
    (star->>'profile_id')::uuid,
    (star->>'user_id')::uuid,
    epoch_to_timestamp(star->>'created_at'),
    epoch_to_timestamp(star->>'updated_at'),
    now(),
    now()
from changes_data,
    jsonb_array_elements(stars_created) as star;
-- delete stars
with changes_data as (
    select jsonb_array_elements_text(changes->'stars'->'deleted')::uuid as deleted
)
update stars
set deleted_at = now(),
    last_modified_at = now()
from changes_data
where stars.id = changes_data.deleted;
-- update profiles
for updated_profile in
select jsonb_array_elements((changes->'profiles'->'updated')) loop perform update_profile(
        (updated_profile->>'id')::uuid,
        (updated_profile->>'name'),
        (updated_profile->>'slug'),
        (updated_profile->>'primary_stack_id')::uuid,
        epoch_to_timestamp(updated_profile->>'updated_at')
    );
end loop;
end;
$$ language plpgsql;