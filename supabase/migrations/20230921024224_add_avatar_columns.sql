alter table profiles
add avatar_image character varying default null,
add avatar_blurhash character varying default null;

create or replace view profiles_view as
select profiles.id,
    profiles.created_at,
    profiles.deleted_at,
    profiles.server_created_at,
    profiles.user_id,
    profiles.name,
    profiles.slug,
    profiles.description,
    profiles.image,
    profiles.blurhash,
    profiles.website,
    profiles.twitter,
    profiles.twitter_image_url,
    profiles.youtube,
    profiles.is_featured,
    profiles.primary_stack_id,
    count(all_stars.profile_id) as number_of_stars,
    count(user_stars.profile_id) > 0 as is_starred,
    count(stacks_view.profile_id) as number_of_stacks,
    case
        when max(stacks_view.updated_at) > profiles.updated_at then max(stacks_view.updated_at)
        else profiles.updated_at
    end as updated_at,
    case
        when max(stacks_view.last_modified_at) > profiles.last_modified_at then max(stacks_view.last_modified_at)
        else profiles.last_modified_at
    end as last_modified_at,
    profiles.avatar_image,
    profiles.avatar_blurhash
from profiles
    left join stars as all_stars on (
        all_stars.profile_id = profiles.id
        and all_stars.deleted_at is null
    )
    left join stars as user_stars on (
        user_stars.profile_id = profiles.id
        and user_stars.user_id = auth.uid()
        and user_stars.deleted_at is null
    )
    left join stacks_view on (
        stacks_view.profile_id = profiles.id
        and stacks_view.deleted_at is null
    )
group by profiles.id;

create or replace view sync_profiles_view as -- user's own profiles
select *
from profiles_view
where user_id = auth.uid() -- recently updated profiles
union
select *
from (
        select *
        from profiles_view
        order by updated_at desc
        limit 100
    ) as updated_profiles -- starred profiles
union
select *
from profiles_view
where is_starred is true;