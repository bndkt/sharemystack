create view sync_picks_view as
select picks_view.*
from picks_view
    left join sync_stacks_view on (sync_stacks_view.id = picks_view.stack_id);