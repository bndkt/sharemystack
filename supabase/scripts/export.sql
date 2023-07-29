\COPY (SELECT stacks.* FROM stacks WHERE is_featured = FALSE) TO './supabase/exports/stacks.csv' WITH CSV HEADER;
\COPY (SELECT picks.* FROM picks LEFT JOIN stacks ON (stacks.id = picks.stack_id) WHERE stacks.is_featured = FALSE) TO './supabase/exports/picks.csv' WITH CSV HEADER;
\COPY (SELECT * FROM stars) TO './supabase/exports/stars.csv' WITH CSV HEADER;
\COPY (SELECT id, aud, role FROM auth.users) TO './supabase/exports/users.csv' WITH CSV HEADER;
