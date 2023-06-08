create view categories_view as
    select
    picks.stack_id,
    categories.name as category_name,
    categories.slug as category_slug,
    tools.name as tool_name,
    tools.slug as tool_slug,
    tools.website as tool_website,
    tools.icon as tool_icon,
    tools.color as tool_color
    from
    categories
    left join categorizations on categorizations.tool_id = tools.id;
