create view stacks_view as
select stacks.id,
    stacks.profile_id,
    stacks.stack_type_id,
    stacks.is_primary,
    profiles.created_at,
    profiles.deleted_at,
    profiles.name as profile_name,
    profiles.slug as profile_slug,
    stack_types.name as stack_type_name,
    stack_types.slug as stack_type_slug,
    stack_types.icon_name as stack_type_icon_name,
    count(picks.stack_id) as number_of_picks,
    case
        when max(picks.updated_at) > stacks.updated_at then max(picks.updated_at)
        else stacks.updated_at
    end as updated_at,
    case
        when max(picks.last_modified_at) > stacks.last_modified_at then max(picks.last_modified_at)
        else stacks.last_modified_at
    end as last_modified_at
from stacks
    left join profiles on (profiles.id = stacks.profile_id)
    left join stack_types on (stack_types.id = stacks.stack_type_id)
    left join picks on (
        picks.stack_id = stacks.id
        and picks.deleted_at is null
    )
group by (stacks.id, profiles.id, stack_types.id);