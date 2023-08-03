insert into storage.buckets (id, name, public)
values ('stack-images', 'stack-images', true) on conflict (id) do nothing;