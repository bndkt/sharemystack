insert into storage.buckets (id, name, public)
values ('public-images', 'public-images', true) on conflict (id) do nothing;