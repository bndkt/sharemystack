create or replace function pull(last_pulled_at bigint default 0) returns jsonb as $$
declare _ts timestamp with time zone;
_tools JSONB;
_categories JSONB;
begin _ts := to_timestamp(last_pulled_at / 1000);
SELECT jsonb_build_object(
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
    ) INTO _tools
FROM tools_view t;
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
RETURN jsonb_build_object(
    'changes',
    jsonb_build_object(
        'tools',
        _tools,
        'categories',
        _categories
    ),
    'timestamp',
    EXTRACT(
        EPOCH
        FROM NOW() at time zone 'UTC'
    ) * 1000
);
END;
$$ LANGUAGE plpgsql;
SELECT pull();