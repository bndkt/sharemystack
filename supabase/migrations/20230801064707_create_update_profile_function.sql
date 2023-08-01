create or replace function update_profile(
        profile_id uuid,
        profile_name character varying,
        profile_slug character varying,
        profile_primary_stack_id uuid,
        profile_updated_at timestamp with time zone
    ) returns uuid as $$
declare retries integer := 6;
-- number of retries
suffix text;
begin for i in 1..retries loop begin -- attempt to update the value
update profiles
set name = profile_name,
    slug = profile_slug,
    primary_stack_id = profile_primary_stack_id,
    updated_at = profile_updated_at,
    last_modified_at = NOW()
where id = profile_id;
RETURN profile_id;
exception
when unique_violation then -- if a unique violation occurs, append a random string and try again
suffix := substr(md5(random()::text), 1, 5);
-- generate a 5-character random string
profile_slug := profile_slug || suffix;
end;
end loop;
raise 'could not update value % after % attempts due to unique constraint violations',
profile_slug,
retries;
end;
$$ language plpgsql;