CREATE view sync_picks_view AS
SELECT *
FROM (
        SELECT *
        FROM picks_view
        ORDER BY updated_at DESC
        LIMIT 25
    ) AS updated_query
UNION
SELECT *
FROM picks_view
WHERE stack_id IN (
        SELECT id
        FROM sync_stacks_view
    );