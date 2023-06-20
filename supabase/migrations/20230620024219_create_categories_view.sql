create view categories_view as
    select
    categories.*,
    COUNT(categorizations) as tools,
    COUNT(picks) as picks
    from
    categories
    left join categorizations on (categorizations.category_id = categories.id)
    left join picks on (picks.category_id = categories.id)
    group by categories.id;
