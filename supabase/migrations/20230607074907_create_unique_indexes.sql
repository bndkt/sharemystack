create unique index idx_unique_active_slug on profiles(slug)
where deleted_at is null;
create unique index idx_unique_active_user on profiles(user_id)
where deleted_at is null
    and user_id is not null;