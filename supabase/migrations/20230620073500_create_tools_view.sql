create view tools_view as
select tools.id,
    tools.name,
    tools.slug,
    tools.website,
    tools.icon,
    tools.color,
    tools.created_at,
    tools.deleted_at,
    count(picks) as all_picks,
    count(stacks) as user_picks,
    CASE
        WHEN max(picks.updated_at) > tools.updated_at THEN max(picks.updated_at)
        ELSE tools.updated_at
    END as updated_at
from tools
    left join categorizations on (
        categorizations.tool_id = tools.id
        AND categorizations.deleted_at IS NULL
    )
    left join categories on (
        categorizations.category_id = categories.id
        AND categories.deleted_at IS NULL
    )
    left join picks on (
        picks.tool_id = tools.id
        AND picks.deleted_at IS NULL
    )
    left join stacks on (
        picks.stack_id = stacks.id
        and stacks.user_id = auth.uid()
        AND stacks.deleted_at IS NULL
    )
group by (tools.id);