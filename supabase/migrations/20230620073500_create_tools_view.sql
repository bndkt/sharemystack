create view tools_view as
    select
    tools.*,
    categories.id as category_id,
    categories.name as category_name,
    categories.slug as category_slug,
    count(picks) as all_picks,
    count(stacks) as user_picks
    from
    tools
    left join categorizations on (categorizations.tool_id = tools.id)
    left join categories on (categorizations.category_id = categories.id)
    left join picks on (picks.tool_id = tools.id)
    left join stacks on (picks.stack_id = stacks.id and stacks.user_id = auth.uid())
    group by (tools.id, categories.id);
