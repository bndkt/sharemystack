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
                WHERE t.created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.created_at <= _ts
                    AND t.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(t)) FILTER (
                WHERE t.deleted_at > _ts
            ),
            '[]'::jsonb
        )
    ) into _tools
from tools_view t;
--- Categories
SELECT jsonb_build_object(
        'created',
        COALESCE(
            jsonb_agg(to_jsonb(c)) FILTER (
                WHERE c.created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(c)) FILTER (
                WHERE c.created_at <= _ts
                    AND c.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(c)) FILTER (
                WHERE c.deleted_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _categories
FROM categories_view c;
--- Categorizations
SELECT jsonb_build_object(
        'created',
        COALESCE(
            jsonb_agg(to_jsonb(c)) FILTER (
                WHERE c.created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(c)) FILTER (
                WHERE c.created_at <= _ts
                    AND c.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(c)) FILTER (
                WHERE c.deleted_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _categorizations
FROM categorizations c;
--- Stacks
SELECT jsonb_build_object(
        'created',
        COALESCE(
            jsonb_agg(to_jsonb(s)) FILTER (
                WHERE s.created_at > _ts
            ),
            '[]'::jsonb
        ),
        'updated',
        COALESCE(
            jsonb_agg(to_jsonb(s)) FILTER (
                WHERE s.created_at <= _ts
                    AND s.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        COALESCE(
            jsonb_agg(to_jsonb(s)) FILTER (
                WHERE s.deleted_at > _ts
            ),
            '[]'::jsonb
        )
    ) INTO _stacks
FROM sync_stacks_view s;
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
        _stacks -- 'picks',
        -- _picks
    ),
    'timestamp',
    EXTRACT(
        EPOCH
        FROM NOW() at time zone 'UTC'
    ) * 1000
);
END;
$$ LANGUAGE plpgsql;