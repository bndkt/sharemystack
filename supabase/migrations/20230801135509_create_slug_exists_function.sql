create or replace function slug_exists(input_slug text) returns boolean as $$
declare exists boolean;
begin
select exists(
        select 1
        from profiles
        where slug = input_slug
    ) into exists;
return exists;
end;
$$ language plpgsql;