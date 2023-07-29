create or replace function pull(last_pulled_at bigint default 0) returns jsonb as $$
declare _ts timestamp with time zone;
_tools jsonb;
_categories jsonb;
_categorizations jsonb;
_stacks jsonb;
_picks jsonb;
_stars jsonb;
begin -- timestamp
_ts := to_timestamp(last_pulled_at / 1000);
-- tools
select jsonb_build_object(
        'created',
        '[]'::jsonb,
        'updated',
        coalesce(
            jsonb_agg(
                jsonb_build_object(
                    'id',
                    t.id,
                    'name',
                    t.name,
                    'slug',
                    t.slug,
                    'color',
                    t.color,
                    'icon',
                    t.icon,
                    'website',
                    t.website,
                    'affiliate_link',
                    t.affiliate_link,
                    'app_store',
                    t.app_store,
                    'user_picks',
                    t.user_picks,
                    'all_picks',
                    t.all_picks,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) filter (
                where t.deleted_at is null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        coalesce(
            jsonb_agg(to_jsonb(t.id)) filter (
                where t.deleted_at is not null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) into _tools
from tools_view t;
--- categories
select jsonb_build_object(
        'created',
        '[]'::jsonb,
        'updated',
        coalesce(
            jsonb_agg(
                jsonb_build_object(
                    'id',
                    t.id,
                    'name',
                    t.name,
                    'slug',
                    t.slug,
                    'icon',
                    t.icon,
                    'number_of_tools',
                    t.number_of_tools,
                    'is_coming_soon',
                    t.is_coming_soon,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) filter (
                where t.deleted_at is null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        coalesce(
            jsonb_agg(to_jsonb(t.id)) filter (
                where t.deleted_at is not null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) into _categories
from categories_view t;
--- categorizations
select jsonb_build_object(
        'created',
        '[]'::jsonb,
        'updated',
        coalesce(
            jsonb_agg(
                jsonb_build_object(
                    'id',
                    t.id,
                    'tool_id',
                    t.tool_id,
                    'category_id',
                    t.category_id,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) filter (
                where t.deleted_at is null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        coalesce(
            jsonb_agg(to_jsonb(t.id)) filter (
                where t.deleted_at is not null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) into _categorizations
from categorizations t;
--- stacks
select jsonb_build_object(
        'created',
        '[]'::jsonb,
        'updated',
        coalesce(
            jsonb_agg(
                jsonb_build_object(
                    'id',
                    t.id,
                    'name',
                    t.name,
                    'slug',
                    t.slug,
                    'twitter_image_url',
                    t.twitter_image_url,
                    'website',
                    t.website,
                    'twitter',
                    t.twitter,
                    'youtube',
                    t.youtube,
                    'description',
                    t.description,
                    'image',
                    t.image,
                    'is_featured',
                    t.is_featured,
                    'number_of_stars',
                    t.number_of_stars,
                    'user_id',
                    t.user_id,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) filter (
                where t.deleted_at is null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        coalesce(
            jsonb_agg(to_jsonb(t.id)) filter (
                where t.deleted_at is not null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) into _stacks
from sync_stacks_view t;
--- picks
select jsonb_build_object(
        'created',
        '[]'::jsonb,
        'updated',
        coalesce(
            jsonb_agg(
                jsonb_build_object(
                    'id',
                    t.id,
                    'stack_id',
                    t.stack_id,
                    'stack_name',
                    t.stack_name,
                    'stack_slug',
                    t.stack_slug,
                    'tool_id',
                    t.tool_id,
                    'tool_name',
                    t.tool_name,
                    'tool_slug',
                    t.tool_slug,
                    'category_id',
                    t.category_id,
                    'category_name',
                    t.category_name,
                    'category_slug',
                    t.category_slug,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) filter (
                where t.deleted_at is null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        coalesce(
            jsonb_agg(to_jsonb(t.id)) filter (
                where t.deleted_at is not null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) into _picks
from sync_picks_view t;
--- stars
select jsonb_build_object(
        'created',
        '[]'::jsonb,
        'updated',
        coalesce(
            jsonb_agg(
                jsonb_build_object(
                    'id',
                    t.id,
                    'stack_id',
                    t.stack_id,
                    'user_id',
                    t.user_id,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) filter (
                where t.deleted_at is null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        coalesce(
            jsonb_agg(to_jsonb(t.id)) filter (
                where t.deleted_at is not null
                    and t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) into _stars
from stars t;
return jsonb_build_object(
    'changes',
    jsonb_build_object(
        'tools',
        _tools,
        'categories',
        _categories,
        'categorizations',
        _categorizations,
        'stacks',
        _stacks,
        'picks',
        _picks,
        'stars',
        _stars
    ),
    'timestamp',
    timestamp_to_epoch(now())
);
end;
$$ language plpgsql;