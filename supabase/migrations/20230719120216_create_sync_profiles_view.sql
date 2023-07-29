create view sync_profiles_view as -- user's own profiles
select *
from profiles_view
where user_id = auth.uid() -- recently updated profiles
union
select *
from (
        select *
        from profiles_view
        order by updated_at desc
        limit 100
    ) as updated_profiles -- starred profiles
union
select *
from profiles_view
where is_starred is true;