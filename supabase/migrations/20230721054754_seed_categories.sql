-- gen_random_uuid()
insert into public.categories (id, name, slug, icon, soon)
values (
        '6a9095b4-132e-4625-891d-8286e92e8f92',
        'Email Service',
        'email-service',
        'Mail',
        false
    ),
    (
        'f899b6d5-a1e1-48fe-96c2-ec45e00425bc',
        'Browser',
        'browser',
        '',
        false
    ),
    (
        'd3faed2f-ea3f-4ec9-9118-e3d6db4fe42e',
        'Calendar',
        'calendar',
        'Calendar',
        true
    ),
    (
        'a53d4fba-35a4-49e6-baf3-0e7bf2a1188b',
        'IDE',
        'ide',
        'TerminalSquare',
        true
    ),
    (
        'cf44a840-289b-4667-8ce5-39a705c9725f',
        'Terminal',
        'terminal',
        'Terminal',
        true
    ),
    (
        '7cc31f5b-77a9-4fb6-960d-c72ef0abf82b',
        'Music',
        'music',
        'Music',
        true
    ),
    (
        '13477943-f847-4c57-80f2-e519d54ff860',
        'Podcast',
        'podcast',
        'Podcast',
        true
    ),
    (
        '8f5ff296-f438-40fc-8c48-b437810385af',
        'Operating System',
        'operating-system',
        'AppWindow',
        false
    ),
    (
        'bf4fb3cd-38d9-4135-abc7-7f291c498366',
        'Note-taking',
        'note-taking',
        'ClipboardEdit',
        false
    ),
    (
        '5b4d499c-114e-472f-baa9-3adc7685936c',
        'Mobile Operating System',
        'mobile-operating-system',
        'Smartphone',
        false
    ),
    (
        '0e93b69f-3415-4fec-a5e6-da1f779b43a6',
        'Password Management',
        'password-management',
        'Fingerprint',
        false
    ),
    (
        'f370ab2a-7abb-4ad8-a501-58a25bb559f4',
        'Email Client',
        'email-client',
        'Mail',
        false
    ),
    (
        '86f3c1ef-3cfb-46e4-841d-3f2e1d9d1843',
        'File Hosting',
        'file-hosting',
        'File',
        false
    ),
    (
        '7c470aa0-e03c-4542-ba46-6983b51c8ae0',
        'Video Conferencing',
        'video-conferencing',
        'Video',
        false
    ),
    (
        'ec5b8a05-80a5-4c72-abf1-0082c763d9fd',
        'Instant Messaging',
        'instant-messaging',
        'MessageCircle',
        false
    ),
    (
        '0b8e259e-7683-4267-a1e7-e8cba6a39f19',
        'Task Management',
        'task-management',
        'CheckSquare',
        false
    ) on conflict (id) do
update
set name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    icon = EXCLUDED.icon,
    soon = EXCLUDED.soon;
insert into public.categorizations (tool_id, category_id)
values -- Note-taking
    (
        '0115cd3b-869d-4058-94e1-a67863eb6045',
        'bf4fb3cd-38d9-4135-abc7-7f291c498366'
    ),
    -- Obsidian
    (
        '5b6a6858-d014-45b7-8dd6-4b85372663d6',
        'bf4fb3cd-38d9-4135-abc7-7f291c498366'
    ),
    -- Notion
    (
        'c60f8bf1-a3a7-4dee-a7f8-cef89a9a7f6a',
        'bf4fb3cd-38d9-4135-abc7-7f291c498366'
    ),
    -- Apple Notes
    (
        '0e23f13f-bb06-485d-a420-2497661dc023',
        'bf4fb3cd-38d9-4135-abc7-7f291c498366'
    ),
    -- Evernote
    (
        '9b4c841a-cac0-4be6-b74b-eb699a24fb46',
        'bf4fb3cd-38d9-4135-abc7-7f291c498366'
    ),
    -- RemNote
    (
        '739e7782-5e7f-424f-9e82-0c2f39b102ce',
        'bf4fb3cd-38d9-4135-abc7-7f291c498366'
    ),
    -- Logseq
    (
        'e5dcb6e8-2728-42dc-9895-544192f9cb1c',
        'bf4fb3cd-38d9-4135-abc7-7f291c498366'
    ),
    -- Tana
    (
        '7d5a14f8-f5a1-4163-b9fe-075d8979f6f5',
        'bf4fb3cd-38d9-4135-abc7-7f291c498366'
    ),
    -- Bear
    -- Password Management
    (
        '9ab4d55d-a1cc-402f-9fe6-d60227a6c7a6',
        '0e93b69f-3415-4fec-a5e6-da1f779b43a6'
    ),
    -- 1Password
    (
        '776cb0c8-c0d2-4071-a9e1-e0d9eae4cbd6',
        '0e93b69f-3415-4fec-a5e6-da1f779b43a6'
    ),
    -- LastPass
    (
        'eb2a8dc6-2ad4-4228-b4da-ea41d6e95055',
        '0e93b69f-3415-4fec-a5e6-da1f779b43a6'
    ),
    -- Bitwarden
    -- Operating System
    (
        'f0586aef-c792-4b6c-8d5c-8c6de1b436dc',
        '8f5ff296-f438-40fc-8c48-b437810385af'
    ),
    -- macOS
    (
        'f2d26e2e-b59a-44bc-8673-340f0516457f',
        '8f5ff296-f438-40fc-8c48-b437810385af'
    ),
    -- Windows
    (
        '92f307f2-6897-4831-9033-25833df73f6d',
        '8f5ff296-f438-40fc-8c48-b437810385af'
    ),
    -- Linux
    -- IDE
    (
        '68c52f82-7755-434d-bc07-1eee6bfe982f',
        'a53d4fba-35a4-49e6-baf3-0e7bf2a1188b'
    ),
    -- VS Code
    -- () -- Vim
    -- Browser
    (
        '95c4b2f8-9b08-462a-a4cd-b8e908b8b3df',
        'f899b6d5-a1e1-48fe-96c2-ec45e00425bc'
    ),
    -- Google Chrome
    (
        'f40604f8-e501-4418-9238-880c13d914f9',
        'f899b6d5-a1e1-48fe-96c2-ec45e00425bc'
    ),
    -- Arc
    (
        '1ce3f168-0d7a-438f-b499-515a17276230',
        'f899b6d5-a1e1-48fe-96c2-ec45e00425bc'
    ),
    -- Safari
    (
        '603ec4b3-4ea4-4ef7-b2a6-ec0536f58de4',
        'f899b6d5-a1e1-48fe-96c2-ec45e00425bc'
    ),
    -- Firefox
    -- Email Service
    (
        '324d5413-cde6-4151-a71d-8dad2c7c05e0',
        '6a9095b4-132e-4625-891d-8286e92e8f92'
    ),
    -- Apple iCloud
    (
        'c2ac9bb6-10ce-4b46-aefb-962d8e1de5c9',
        '6a9095b4-132e-4625-891d-8286e92e8f92'
    ),
    -- Google Mail
    (
        '877b27e1-092e-4d2e-baae-4f974a223161',
        '6a9095b4-132e-4625-891d-8286e92e8f92'
    ),
    -- Outlook.com
    -- Task Management
    (
        '3ce6bedb-2605-4f54-a269-89a4737b14ba',
        '0b8e259e-7683-4267-a1e7-e8cba6a39f19'
    ),
    -- Things
    (
        '0a2ffd37-4073-4b94-b0b7-96e03700c98f',
        '0b8e259e-7683-4267-a1e7-e8cba6a39f19'
    ),
    -- Todoist
    (
        'c365473b-7b08-4426-95ce-2c7a30bfa772',
        '0b8e259e-7683-4267-a1e7-e8cba6a39f19'
    ),
    -- Microsoft To Do
    (
        '3b3dff9e-eb6a-4c09-bbca-50edb27035bd',
        '0b8e259e-7683-4267-a1e7-e8cba6a39f19'
    ),
    -- Google Tasks
    -- Mobile OS
    (
        '1a2e7f2f-192b-4c5c-88c8-4a5971caa4e9',
        '5b4d499c-114e-472f-baa9-3adc7685936c'
    ),
    -- iOS
    (
        '3c1419d1-802d-40ad-ab17-5b4240ec06b5',
        '5b4d499c-114e-472f-baa9-3adc7685936c'
    ),
    -- Android
    -- Email Client
    (
        '525ad02f-f284-4f55-a2b2-d277d31bf209',
        'f370ab2a-7abb-4ad8-a501-58a25bb559f4'
    ),
    -- Microsoft Outlook
    -- ('', 'f370ab2a-7abb-4ad8-a501-58a25bb559f4'), -- Apple Mail
    (
        '98d9d7de-0ae1-440c-a708-2955b82bfbf1',
        'f370ab2a-7abb-4ad8-a501-58a25bb559f4'
    ),
    -- Superhuman
    (
        'c2ac9bb6-10ce-4b46-aefb-962d8e1de5c9',
        'f370ab2a-7abb-4ad8-a501-58a25bb559f4'
    ),
    -- Google Mail
    -- Calendar
    (
        '525ad02f-f284-4f55-a2b2-d277d31bf209',
        'd3faed2f-ea3f-4ec9-9118-e3d6db4fe42e'
    ),
    -- Microsoft Outlook
    (
        'b3c10887-f3b3-438f-9fdf-5136e86c57bd',
        'd3faed2f-ea3f-4ec9-9118-e3d6db4fe42e'
    ),
    -- Google Calendar
    (
        'b021f050-f4af-4233-9fda-6eeb4cf65544',
        'd3faed2f-ea3f-4ec9-9118-e3d6db4fe42e'
    ),
    -- Cron
    -- Video Conferencing
    (
        'c481dac2-17d7-4b63-b07d-8e9fd267f499',
        '7c470aa0-e03c-4542-ba46-6983b51c8ae0'
    ),
    -- Microsoft Teams
    (
        '31bd97cd-300a-494f-9712-0f50bed27e89',
        '7c470aa0-e03c-4542-ba46-6983b51c8ae0'
    ),
    -- Google Meet
    (
        '5f526565-81a5-4944-be2c-b6ce9cefed93',
        '7c470aa0-e03c-4542-ba46-6983b51c8ae0'
    ),
    -- Zoom
    -- Instant Messaging
    (
        '3a1fcf9e-61af-468b-b299-375f48d4ebe1',
        'ec5b8a05-80a5-4c72-abf1-0082c763d9fd'
    ),
    -- WhatsApp
    -- ('', 'ec5b8a05-80a5-4c72-abf1-0082c763d9fd'), -- iMessage
    (
        '5e2a51d2-c8f2-4813-aa28-2a3be8ce6e79',
        'ec5b8a05-80a5-4c72-abf1-0082c763d9fd'
    ),
    -- Signal
    (
        '19dc4b7c-6f8d-4e1d-a1e4-67567bd25368',
        'ec5b8a05-80a5-4c72-abf1-0082c763d9fd'
    ),
    -- Telegram
    -- File Hosting
    (
        'a37e164f-f6a9-4412-9579-083fe5f725d7',
        '86f3c1ef-3cfb-46e4-841d-3f2e1d9d1843'
    ),
    -- OneDrive
    (
        '4c55bed6-cf33-4800-b050-ee45a67bee9c',
        '86f3c1ef-3cfb-46e4-841d-3f2e1d9d1843'
    ),
    -- Box
    (
        'af495155-60b7-425c-871f-28917d91c586',
        '86f3c1ef-3cfb-46e4-841d-3f2e1d9d1843'
    ) -- Dropbox
    -- ('3526b556-c5da-4902-854b-267a5c71b942', ''), Salesforce
    -- ('94eba581-26a2-466b-aa06-6f84b5202cc6', ''), Discord
    -- ('98d9d7de-0ae1-440c-a708-2955b82bfbf1', ''), Superhuman
    -- ('da0f681a-763a-4fe1-9785-8d9f6d7a47e0', ''), Day One
    -- ('a1587dcb-2676-4408-acb5-147a446d1435', ''), Slack
;