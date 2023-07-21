create or replace function pull(last_pulled_at bigint default 0) returns jsonb as $$
declare _ts timestamp with time zone;
_tools JSONB;
_categories JSONB;
_categorizations JSONB;
_stacks JSONB;
_picks JSONB;
begin -- Timestamp
_ts := to_timestamp(last_pulled_at / 1000);
-- Tools
select jsonb_build_object(
        'created',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.created_at <= _ts
                    AND t.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at > _ts
            ),
            '[]'::jsonb
        )
    ) into _tools
from tools t;
--- Categories
SELECT jsonb_build_object(
        'created',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.created_at <= _ts
                    AND t.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at > _ts
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
                    AND t.created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.created_at <= _ts
                    AND t.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at > _ts
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
                    AND t.created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.created_at <= _ts
                    AND t.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at > _ts
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
                    AND t.created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at IS NULL
                    AND t.created_at <= _ts
                    AND t.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t.id)) FILTER (
                WHERE t.deleted_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _picks
FROM picks t
WHERE stack_id IN (
        SELECT id
        FROM sync_stacks_view
    );
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
        _picks
    ),
    'timestamp',
    EXTRACT(
        EPOCH
        FROM NOW() at time zone 'UTC'
    ) * 1000
);
END;
$$ LANGUAGE plpgsql;