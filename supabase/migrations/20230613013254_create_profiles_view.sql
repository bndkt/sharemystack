CREATE view stacks_view AS
SELECT stacks.id,
    stacks.name,
    stacks.slug,
    stacks.created_at,
    stacks.deleted_at,
    stacks.is_featured,
    stacks.twitter,
    stacks.twitter_image_url,
    stacks.youtube,
    stacks.description,
    stacks.image,
    stacks.website,
    stacks.user_id,
    stacks.server_created_at,
    COUNT(all_stars.stack_id) AS number_of_stars,
    COUNT(user_stars.stack_id) > 0 AS is_starred,
    COUNT(picks.stack_id) AS number_of_picks,
    CASE
        WHEN max(picks.updated_at) > stacks.updated_at THEN max(picks.updated_at)
        ELSE stacks.updated_at
    END AS updated_at,
    CASE
        WHEN max(user_stars.last_modified_at) > stacks.last_modified_at THEN max(user_stars.last_modified_at)
        ELSE stacks.last_modified_at
    END AS last_modified_at
FROM stacks
    LEFT JOIN stars AS all_stars ON (
        all_stars.stack_id = stacks.id
        AND all_stars.deleted_at IS NULL
    )
    LEFT JOIN stars as user_stars ON (
        user_stars.stack_id = stacks.id
        AND user_stars.user_id = auth.uid()
        AND user_stars.deleted_at IS NULL
    )
    LEFT JOIN picks ON (
        picks.stack_id = stacks.id
        AND picks.deleted_at IS NULL
    )
GROUP BY stacks.id;