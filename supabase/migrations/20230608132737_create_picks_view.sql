create view picks_view as
select picks.stack_id,
    picks.tool_id,
    categories.name as category_name,
    categories.slug as category_slug,
    tools.name as tool_name,
    tools.slug as tool_slug,
    tools.website as tool_website,
    tools.icon as tool_icon,
    tools.color as tool_color
from picks
    left join stacks on picks.stack_id = stacks.id
    left join tools on picks.tool_id = tools.id
    left join categories on picks.category_id = categories.id;