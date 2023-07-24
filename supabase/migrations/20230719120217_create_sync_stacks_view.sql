CREATE view sync_stacks_view AS
SELECT *
FROM stacks_view
WHERE user_id = auth.uid()
UNION
SELECT *
FROM (
        SELECT *
        FROM stacks_view
        ORDER BY updated_at DESC
        LIMIT 100
    ) AS updated_query
UNION
SELECT *
FROM stacks_view
WHERE is_starred IS true
UNION
SELECT *
FROM stacks_view
WHERE id IN (
        SELECT stack_id
        FROM picks
        ORDER BY updated_at DESC
        LIMIT 25
    );