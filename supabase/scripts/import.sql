\COPY auth.users(id, aud, role) FROM './supabase/exports/users.csv' WITH CSV HEADER;
\COPY profiles (id,created_at,updated_at,deleted_at,server_created_at,last_modified_at,name,slug,user_id,twitter,twitter_image_url,website,description,youtube,image,is_featured) FROM './supabase/exports/stacks.csv' WITH CSV HEADER;
-- \COPY picks FROM './supabase/exports/picks.csv' WITH CSV HEADER;
-- \COPY stars FROM './supabase/exports/stars.csv' WITH CSV HEADER;
