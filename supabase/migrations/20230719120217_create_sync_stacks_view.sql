create view sync_stacks_view as
select *
from stacks_view
where user_id = auth.uid()
union
select *
from (
        select *
        from stacks_view
        order by updated_at desc
        limit 100
    ) as updated_query
union
select *
from stacks_view
where starred is true