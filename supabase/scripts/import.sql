--\copy auth.users(id, aud, role) from './supabase/exports/users.csv' with csv header;
\copy profiles (id,created_at,updated_at,deleted_at,server_created_at,last_modified_at,name,slug,user_id,twitter,twitter_image_url,website,description,youtube,image,is_featured) from './supabase/exports/stacks.csv' with csv header;
