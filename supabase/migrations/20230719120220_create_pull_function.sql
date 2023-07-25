CREATE OR replace FUNCTION pull(last_pulled_at BIGINT default 0) RETURNS jsonb AS $$
DECLARE _ts TIMESTAMP WITH TIME ZONE;
_tools JSONB;
_categories JSONB;
_categorizations JSONB;
_stacks JSONB;
_picks JSONB;
_stars JSONB;
BEGIN -- Timestamp
_ts := to_timestamp(last_pulled_at / 1000);
-- Tools
SELECT jsonb_build_object(
        'created',
        COALESCE(
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
                    'user_picks',
                    t.user_picks,
                    'all_picks',
                    t.all_picks,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
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
                    'user_picks',
                    t.user_picks,
                    'all_picks',
                    t.all_picks,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at <= _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at IS NOT NULL
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _tools
FROM tools_view t;
--- Categories
SELECT jsonb_build_object(
        'created',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at <= _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at IS NOT NULL
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _categories
FROM categories_view t;
--- Categorizations
SELECT jsonb_build_object(
        'created',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at <= _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at IS NOT NULL
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _categorizations
FROM categorizations t;
--- Stacks
SELECT jsonb_build_object(
        'created',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at <= _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at IS NOT NULL
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _stacks
FROM sync_stacks_view t;
--- Picks
SELECT jsonb_build_object(
        'created',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at <= _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at IS NOT NULL
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _picks
FROM sync_picks_view t;
--- Stars
SELECT jsonb_build_object(
        'created',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
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
            ) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at <= _ts
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at IS NOT NULL
                    AND t.last_modified_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _stars
FROM stars t;
RETURN jsonb_build_object(
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
    timestamp_to_epoch(NOW())
);
END;
$$ LANGUAGE plpgsql;