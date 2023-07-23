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
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
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
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
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
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
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
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
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
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
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
FROM picks t
WHERE stack_id IN (
        SELECT id
        FROM sync_stacks_view
    );
--- Stars
SELECT jsonb_build_object(
        'created',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.server_created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
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
    EXTRACT(
        EPOCH
        FROM NOW() AT TIME ZONE 'UTC'
    ) * 1000
);
END;
$$ LANGUAGE plpgsql;