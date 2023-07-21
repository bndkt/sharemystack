-- gen_random_uuid()
/*
 insert into
 auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, confirmation_token, recovery_token, email_change_token_new, email_change)
 values
 ('00000000-0000-0000-0000-000000000000', '6a6d9730-acf6-465e-851b-c19d2f5d533b', 'authenticated', 'authenticated', 'test@sharemystack.com', '$2a$10$iRobDodxHCqbf7eWt2hlsubfp4oovU1opGe0CJT4MZfUWMbSitfH.', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', '', '', '', '')
 on conflict (id) do nothing;
 
 insert into
 auth.identities (id, provider, user_id, identity_data, last_sign_in_at, created_at, updated_at)
 values
 ('6a6d9730-acf6-465e-851b-c19d2f5d533b', 'email', '6a6d9730-acf6-465e-851b-c19d2f5d533b', '{"sub":"6a6d9730-acf6-465e-851b-c19d2f5d533b","email":"test@sharemystack.com"}', now(), now(), now());
 */
-- August Bradley, Notion
/* insert into
 public.stars (user_id, stack_id, category_id, tool_id)
 values
 ('6a6d9730-acf6-465e-851b-c19d2f5d533b', 'fbc5602c-ebef-4282-8754-d56520486498', NULL, NULL), -- Benedikt
 ('6a6d9730-acf6-465e-851b-c19d2f5d533b', '4abd2df7-bd61-457f-8297-47aa33910cc8', NULL, NULL); -- Benedikt
 */