create view tools_view as
    select
    tools.*,
    COUNT(categories.name) as categories
    from
    tools
    left join categorizations on (categorizations.tool_id = tools.id)
    left join categories on (categorizations.category_id = categories.id)
    group by tools.id;
