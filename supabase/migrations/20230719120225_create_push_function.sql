--SELECT (changes->'picks'->'created') AS picks_created,
--(changes->'picks'->'deleted') AS picks_deleted,
--(changes->'picks'->'updated') AS picks_updated
CREATE OR REPLACE FUNCTION push(changes JSONB) RETURNS VOID AS $$
DECLARE new_profile JSONB;
DECLARE updated_profile JSONB;
BEGIN -- Insert new profiles
FOR new_profile IN
SELECT jsonb_array_elements((changes->'profiles'->'created')) LOOP PERFORM create_profile(
        (new_profile->>'name'),
        (new_profile->>'slug'),
        epoch_to_timestamp(new_profile->>'created_at'),
        epoch_to_timestamp(new_profile->>'updated_at')
    );
END LOOP;
-- Delete profiles
WITH changes_data AS (
    SELECT jsonb_array_elements_text(changes->'profiles'->'deleted')::uuid AS deleted
)
UPDATE profiles
SET deleted_at = NOW(),
    last_modified_at = NOW()
FROM changes_data
WHERE profiles.id = changes_data.deleted;
-- Insert new picks
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
-- Insert new stacks
WITH changes_data AS (
    SELECT (changes->'stacks'->'created') AS stacks_created
)
INSERT INTO stacks (
        id,
        profile_id,
        stack_type_id,
        created_at,
        updated_at,
        server_created_at,
        last_modified_at
    )
SELECT (stack->>'id')::uuid,
    (stack->>'profile_id')::uuid,
    (stack->>'stack_type_id')::uuid,
    epoch_to_timestamp(stack->>'created_at'),
    epoch_to_timestamp(stack->>'updated_at'),
    NOW(),
    NOW()
FROM changes_data,
    jsonb_array_elements(stacks_created) AS stack;
-- Delete stacks
WITH changes_data AS (
    SELECT jsonb_array_elements_text(changes->'stacks'->'deleted')::uuid AS deleted
)
UPDATE stacks
SET deleted_at = NOW(),
    last_modified_at = NOW()
FROM changes_data
WHERE stacks.id = changes_data.deleted;
-- Insert new stars
WITH changes_data AS (
    SELECT (changes->'stars'->'created') AS stars_created
)
INSERT INTO stars (
        id,
        profile_id,
        user_id,
        created_at,
        updated_at,
        server_created_at,
        last_modified_at
    )
SELECT (star->>'id')::uuid,
    (star->>'profile_id')::uuid,
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
-- Update profiles
FOR updated_profile IN
SELECT jsonb_array_elements((changes->'profiles'->'updated')) LOOP PERFORM update_profile(
        (updated_profile->>'id')::uuid,
        (updated_profile->>'name'),
        (updated_profile->>'slug'),
        (updated_profile->>'primary_stack_id')::uuid,
        epoch_to_timestamp(updated_profile->>'updated_at')
    );
END LOOP;
END;
$$ LANGUAGE plpgsql;