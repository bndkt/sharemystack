create or replace function delete_user() returns void as $$ begin
delete from auth.users
where id = auth.uid();
end;
$$ language plpgsql security definer;