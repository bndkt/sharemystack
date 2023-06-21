create view categories_tools_view as
    select
    tools.*,
    categories.id as category_id,
    categories.name as category_name,
    categories.slug as category_slug
    from
    tools
    left join categorizations on (categorizations.tool_id = tools.id)
    left join categories on (categorizations.category_id = categories.id);
