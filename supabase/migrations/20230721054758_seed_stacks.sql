insert into public.stacks (
        id,
        name,
        is_featured,
        slug,
        twitter,
        twitter_image_url,
        website,
        user_id,
        deleted_at
    )
values -- ('fbc5602c-ebef-4282-8754-d56520486498', 'Benedikt Müller', false, '_bndkt', 'bndkt', 'https://pbs.twimg.com/profile_images/1356532269322809347/b8lcrpI6_400x400.jpg', 'https://bndkt.com/', NULL),
    (
        '4abd2df7-bd61-457f-8297-47aa33910cc8',
        'Nick Milo',
        true,
        'nickmilo',
        'NickMilo',
        'https://pbs.twimg.com/profile_images/1674146602355924992/S1Ys-6VE_400x400.jpg',
        'https://www.linkingyourthinking.com/',
        NULL,
        NULL
    ),
    (
        '7eef57cd-dfb6-481d-967e-7d3a024f19d2',
        'Ali Abdaal',
        true,
        'aliabdaal',
        'aliabdaal',
        'https://pbs.twimg.com/profile_images/1496857274165436420/yjDjLCDh_400x400.jpg',
        'https://aliabdaal.com/',
        NULL,
        NULL
    ),
    (
        '211b7b6b-4117-4151-b6bc-cb64214227fd',
        'Tiago Forte',
        true,
        'fortelabs',
        'fortelabs',
        'https://pbs.twimg.com/profile_images/1527701676521672707/YXvJP3ac_400x400.jpg',
        'https://fortelabs.com/',
        NULL,
        NULL
    ),
    (
        'c7e04ef0-f3bd-4532-a33f-029c924c0e05',
        'Thomas Frank',
        true,
        'tomfrankly',
        'TomFrankly',
        'https://pbs.twimg.com/profile_images/1011750442135678976/pjQtLPdD_400x400.jpg',
        'https://thomasjfrank.com/',
        NULL,
        NULL
    ),
    (
        'aeb47866-c97a-4c7a-9967-b98e0d2fea7c',
        'Marie Poulin',
        true,
        'mariepoulin',
        'mariepoulin',
        'https://pbs.twimg.com/profile_images/1680058634678714368/uiHqRHdq_400x400.jpg',
        'https://mariepoulin.com/',
        NULL,
        NULL
    ),
    (
        '061bce7c-3ee1-4660-ad34-4157d79a85ac',
        'August Bradley',
        true,
        'augustbradley',
        'AugustBradley',
        'https://pbs.twimg.com/profile_images/1087478571059240960/LoZXD4aY_400x400.jpg',
        'https://www.yearzero.io/',
        NULL,
        NOW()
    );