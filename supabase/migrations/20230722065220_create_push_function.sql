CREATE OR REPLACE FUNCTION push(changes JSONB) RETURNS VOID AS $$ BEGIN -- Process picks
    WITH changes_data AS (
        SELECT (changes->'picks'->'created') AS picks_created,
            (changes->'picks'->'deleted') AS picks_deleted,
            (changes->'picks'->'updated') AS picks_updated
    ) -- Insert new picks
INSERT INTO picks (id, stack_id, tool_id, category_id)
SELECT (category->>'id')::uuid,
    (category->>'stack_id')::uuid,
    (category->>'tool_id')::uuid,
    (category->>'category_id')::uuid
FROM changes_data,
    jsonb_array_elements(picks_created) AS category;
END;
$$ LANGUAGE plpgsql;