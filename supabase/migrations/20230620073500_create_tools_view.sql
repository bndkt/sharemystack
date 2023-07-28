CREATE view tools_view AS
SELECT tools.id,
    tools.name,
    tools.slug,
    tools.website,
    tools.icon,
    tools.color,
    tools.affiliate_link,
    tools.app_store,
    tools.created_at,
    tools.deleted_at,
    tools.server_created_at,
    tools.last_modified_at,
    count(picks) AS all_picks,
    count(stacks) AS user_picks,
    CASE
        WHEN max(picks.updated_at) > tools.updated_at THEN max(picks.updated_at)
        ELSE tools.updated_at
    END as updated_at
FROM tools
    LEFT JOIN picks ON (
        picks.tool_id = tools.id
        AND picks.deleted_at IS NULL
    )
    LEFT JOIN stacks ON (
        picks.stack_id = stacks.id
        AND stacks.user_id = auth.uid()
        AND stacks.deleted_at IS NULL
    )
GROUP BY (tools.id);