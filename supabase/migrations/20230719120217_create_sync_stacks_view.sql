create view sync_stacks_view as
select stacks_view.*
from stacks_view
    left join sync_profiles_view on (sync_profiles_view.id = stacks_view.profile_id);