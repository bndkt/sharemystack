create view categories_view as
    select
    categories.*,
    COUNT(categorizations) as tools
    from
    categories
    left join categorizations on (categorizations.category_id = categories.id)
    group by categories.id;
