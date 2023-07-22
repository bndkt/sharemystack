CREATE view categories_view AS
SELECT categories.id,
    categories.name,
    categories.slug,
    categories.icon,
    categories.is_coming_soon,
    categories.created_at,
    categories.deleted_at,
    COUNT(categorizations) as number_of_tools,
    CASE
        WHEN max(categorizations.updated_at) > categories.updated_at THEN max(categorizations.updated_at)
        ELSE categories.updated_at
    END AS updated_at
FROM categories
    LEFT JOIN categorizations ON (categorizations.category_id = categories.id)
GROUP BY categories.id;