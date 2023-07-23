--SELECT (changes->'picks'->'created') AS picks_created,
--(changes->'picks'->'deleted') AS picks_deleted,
--(changes->'picks'->'updated') AS picks_updated
CREATE OR REPLACE FUNCTION push(changes JSONB) RETURNS VOID AS $$ BEGIN -- Insert new picks
    WITH changes_data AS (
        SELECT (changes->'picks'->'created') AS picks_created
    )
INSERT INTO picks (
        id,
        stack_id,
        tool_id,
        category_id,
        created_at,
        updated_at,
        server_created_at,
        last_modified_at
    )
SELECT (category->>'id')::uuid,
    (category->>'stack_id')::uuid,
    (category->>'tool_id')::uuid,
    (category->>'category_id')::uuid,
    epoch_to_timestamp(category->>'created_at'),
    epoch_to_timestamp(category->>'updated_at'),
    NOW(),
    NOW()
FROM changes_data,
    jsonb_array_elements(picks_created) AS category;
-- Delete picks
WITH changes_data AS (
    SELECT jsonb_array_elements_text(changes->'picks'->'deleted')::uuid AS deleted
)
UPDATE picks
SET deleted_at = NOW(),
    last_modified_at = NOW()
FROM changes_data
WHERE picks.id = changes_data.deleted;
-- Insert new stars
WITH changes_data AS (
    SELECT (changes->'stars'->'created') AS stars_created
)
INSERT INTO stars (
        id,
        stack_id,
        user_id,
        created_at,
        updated_at,
        server_created_at,
        last_modified_at
    )
SELECT (star->>'id')::uuid,
    (star->>'stack_id')::uuid,
    (star->>'user_id')::uuid,
    epoch_to_timestamp(star->>'created_at'),
    epoch_to_timestamp(star->>'updated_at'),
    NOW(),
    NOW()
FROM changes_data,
    jsonb_array_elements(stars_created) AS star;
-- Delete stars
WITH changes_data AS (
    SELECT jsonb_array_elements_text(changes->'stars'->'deleted')::uuid AS deleted
)
UPDATE stars
SET deleted_at = NOW(),
    last_modified_at = NOW()
FROM changes_data
WHERE stars.id = changes_data.deleted;
END;
$$ LANGUAGE plpgsql;