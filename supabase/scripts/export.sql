\copy (select profiles.* from profiles where is_featured = false) to './supabase/exports/profiles.csv' with csv header;
\copy (select id, aud, role from auth.users) to './supabase/exports/users.csv' with csv header;
