insert into
public.categorizations (tool_id, category_id)
values
('0115cd3b-869d-4058-94e1-a67863eb6045', 'bf4fb3cd-38d9-4135-abc7-7f291c498366'),
('5b6a6858-d014-45b7-8dd6-4b85372663d6', 'bf4fb3cd-38d9-4135-abc7-7f291c498366'),
('c60f8bf1-a3a7-4dee-a7f8-cef89a9a7f6a', 'bf4fb3cd-38d9-4135-abc7-7f291c498366'),
('9ab4d55d-a1cc-402f-9fe6-d60227a6c7a6', '0e93b69f-3415-4fec-a5e6-da1f779b43a6'),
('776cb0c8-c0d2-4071-a9e1-e0d9eae4cbd6', '0e93b69f-3415-4fec-a5e6-da1f779b43a6'),
('0e23f13f-bb06-485d-a420-2497661dc023', 'bf4fb3cd-38d9-4135-abc7-7f291c498366'),
('f0586aef-c792-4b6c-8d5c-8c6de1b436dc', '8f5ff296-f438-40fc-8c48-b437810385af'),
('f2d26e2e-b59a-44bc-8673-340f0516457f', '8f5ff296-f438-40fc-8c48-b437810385af'),
('92f307f2-6897-4831-9033-25833df73f6d', '8f5ff296-f438-40fc-8c48-b437810385af'),
('68c52f82-7755-434d-bc07-1eee6bfe982f', 'a53d4fba-35a4-49e6-baf3-0e7bf2a1188b'),
('95c4b2f8-9b08-462a-a4cd-b8e908b8b3df', 'f899b6d5-a1e1-48fe-96c2-ec45e00425bc'),
('324d5413-cde6-4151-a71d-8dad2c7c05e0', '6a9095b4-132e-4625-891d-8286e92e8f92'),
('3ce6bedb-2605-4f54-a269-89a4737b14ba', '0b8e259e-7683-4267-a1e7-e8cba6a39f19'),
('0a2ffd37-4073-4b94-b0b7-96e03700c98f', '0b8e259e-7683-4267-a1e7-e8cba6a39f19'),
-- ('3526b556-c5da-4902-854b-267a5c71b942', ''), Salesforce
-- ('94eba581-26a2-466b-aa06-6f84b5202cc6', ''), Discord
('b021f050-f4af-4233-9fda-6eeb4cf65544', 'd3faed2f-ea3f-4ec9-9118-e3d6db4fe42e'),
('f40604f8-e501-4418-9238-880c13d914f9', 'f899b6d5-a1e1-48fe-96c2-ec45e00425bc'),
-- ('98d9d7de-0ae1-440c-a708-2955b82bfbf1', ''), Superhuman
('9b4c841a-cac0-4be6-b74b-eb699a24fb46', 'bf4fb3cd-38d9-4135-abc7-7f291c498366'),
-- ('da0f681a-763a-4fe1-9785-8d9f6d7a47e0', ''), Day One
('739e7782-5e7f-424f-9e82-0c2f39b102ce', 'bf4fb3cd-38d9-4135-abc7-7f291c498366'),
('e5dcb6e8-2728-42dc-9895-544192f9cb1c', 'bf4fb3cd-38d9-4135-abc7-7f291c498366'),
-- ('a1587dcb-2676-4408-acb5-147a446d1435', ''), Slack
('1a2e7f2f-192b-4c5c-88c8-4a5971caa4e9', '5b4d499c-114e-472f-baa9-3adc7685936c'),
('3c1419d1-802d-40ad-ab17-5b4240ec06b5', '5b4d499c-114e-472f-baa9-3adc7685936c'),
('1ce3f168-0d7a-438f-b499-515a17276230', 'f899b6d5-a1e1-48fe-96c2-ec45e00425bc'),
('603ec4b3-4ea4-4ef7-b2a6-ec0536f58de4', 'f899b6d5-a1e1-48fe-96c2-ec45e00425bc'),
('eb2a8dc6-2ad4-4228-b4da-ea41d6e95055', '0e93b69f-3415-4fec-a5e6-da1f779b43a6'),
('c365473b-7b08-4426-95ce-2c7a30bfa772', '0b8e259e-7683-4267-a1e7-e8cba6a39f19'),
('3b3dff9e-eb6a-4c09-bbca-50edb27035bd', '0b8e259e-7683-4267-a1e7-e8cba6a39f19'),
('c2ac9bb6-10ce-4b46-aefb-962d8e1de5c9', '6a9095b4-132e-4625-891d-8286e92e8f92'), -- Google Mail
('b3c10887-f3b3-438f-9fdf-5136e86c57bd', 'd3faed2f-ea3f-4ec9-9118-e3d6db4fe42e') -- Google Calendar
-- ('31bd97cd-300a-494f-9712-0f50bed27e89', '') -- Google Meet
on conflict (tool_id, category_id)
do nothing;