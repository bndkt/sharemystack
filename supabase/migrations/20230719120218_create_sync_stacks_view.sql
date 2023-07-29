create view sync_stacks_view as -- user's own stacks
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
where is_starred is true
union
select *
from stacks_view
where id in (
        select stack_id
        from picks
        order by updated_at desc
        limit 25
    );