create view categories_view as
select categories.id,
    categories.name,
    categories.slug,
    categories.icon,
    categories.is_coming_soon,
    categories.created_at,
    categories.deleted_at,
    categories.server_created_at,
    categories.last_modified_at,
    count(categorizations) as number_of_tools,
    case
        when max(categorizations.updated_at) > categories.updated_at then max(categorizations.updated_at)
        else categories.updated_at
    end as updated_at
from categories
    left join categorizations on (categorizations.category_id = categories.id)
group by categories.id;