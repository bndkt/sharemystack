create view stacks_view as
select stacks.id,
    stacks.name,
    stacks.slug,
    stacks.created_at,
    stacks.deleted_at,
    stacks.is_featured,
    stacks.twitter,
    stacks.twitter_image_url,
    stacks.website,
    stacks.user_id,
    stacks.server_created_at,
    stacks.last_modified_at,
    COUNT(all_stars.stack_id) as number_of_stars,
    COUNT(user_stars.stack_id) > 0 as is_starred,
    COUNT(picks.stack_id) as number_of_picks,
    CASE
        WHEN max(user_stars.updated_at) > stacks.updated_at THEN max(user_stars.updated_at)
        ELSE stacks.updated_at
    END AS updated_at
from stacks
    left join stars as all_stars on (
        all_stars.stack_id = stacks.id
        and all_stars.deleted_at is null
    )
    left join stars as user_stars on (
        user_stars.stack_id = stacks.id
        and user_stars.user_id = auth.uid()
        and user_stars.deleted_at is null
    )
    left join picks on (
        picks.stack_id = stacks.id
        and picks.deleted_at is null
    )
group by stacks.id;