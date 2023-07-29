create view picks_view as
select picks.*,
    profiles.name as profile_name,
    profiles.slug as profile_slug,
    stack_types.name as stack_type_name,
    stack_types.slug as stack_type_slug,
    stack_types.icon as stack_type_icon,
    categories.name as category_name,
    categories.slug as category_slug,
    categories.icon as category_icon,
    tools.name as tool_name,
    tools.slug as tool_slug,
    tools.icon as tool_icon,
    tools.color as tool_color
from picks
    left join stacks on stacks.id = picks.stack_id
    left join tools on tools.id = picks.tool_id
    left join categories on categories.id = picks.category_id
    left join stack_types on stack_types.id = stacks.stack_type_id
    left join profiles on profiles.id = stacks.profile_id;