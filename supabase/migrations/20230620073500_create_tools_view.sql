create view tools_view as
    select
    tools.*,
    COUNT(categorizations.category_id) as categorizations
    from
    tools
    left join categorizations on (categorizations.tool_id = tools.id)
    group by tools.id;
