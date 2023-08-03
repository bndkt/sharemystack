\copy (select stacks.* from stacks where is_featured = false) to './supabase/exports/stacks.csv' with csv header;
\copy (select id, aud, role from auth.users) to './supabase/exports/users.csv' with csv header;
