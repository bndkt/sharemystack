create view tools_view as
select tools.id,
    tools.created_at,
    tools.deleted_at,
    tools.server_created_at,
    tools.last_modified_at,
    tools.name,
    tools.slug,
    tools.color,
    tools.website,
    tools.affiliate_link,
    tools.app_store,
    count(picks) as all_picks,
    case
        when max(picks.updated_at) > tools.updated_at then max(picks.updated_at)
        else tools.updated_at
    end as updated_at
from tools
    left join picks on (
        picks.tool_id = tools.id
        and picks.deleted_at is null
    )
group by (tools.id);