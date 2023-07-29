create view stars_view as
select stars.*
from stars
where user_id = auth.uid();