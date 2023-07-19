drop view if exists categories_view;
create view categories_view as
select categories.id,
    categories.name,
    categories.slug,
    categories.icon,
    categories.soon,
    categories.created_at,
    categories.deleted_at,
    COUNT(categorizations) as tools,
    CASE
        WHEN max(categorizations.updated_at) > categories.updated_at THEN max(categorizations.updated_at)
        ELSE categories.updated_at
    END as updated_at
from categories
    left join categorizations on (categorizations.category_id = categories.id)
group by categories.id;