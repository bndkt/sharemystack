create or replace function create_profile(
        profile_id uuid,
        profile_name character varying,
        profile_slug character varying,
        profile_created_at timestamp with time zone,
        profile_updated_at timestamp with time zone
    ) returns uuid as $$
declare retries integer := 6;
-- number of retries
suffix text;
new_id uuid;
begin for i in 1..retries loop begin -- attempt to insert the value
insert into profiles (
        id,
        name,
        slug,
        user_id,
        created_at,
        updated_at,
        server_created_at,
        last_modified_at
    )
values (
        profile_id,
        profile_name,
        profile_slug,
        auth.uid(),
        profile_created_at,
        profile_updated_at,
        now(),
        now() + interval '1 microsecond'
    )
returning id into new_id;
return new_id;
exception
when unique_violation then -- if a unique violation occurs, append a random string and try again
suffix := substr(md5(random()::text), 1, 5);
-- generate a 5-character random string
profile_slug := profile_slug || suffix;
end;
end loop;
raise 'could not insert value % after % attempts due to unique constraint violations',
profile_slug,
retries;
end;
$$ language plpgsql;