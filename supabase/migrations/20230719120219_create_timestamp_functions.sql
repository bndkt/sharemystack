create or replace function epoch_to_timestamp(epoch text) returns timestamp with time zone as $$ begin return timestamp with time zone 'epoch' + ((epoch::bigint) / 1000) * interval '1 second';
end;
$$ language plpgsql;
create or replace function timestamp_to_epoch(ts timestamp with time zone) returns bigint as $$ begin return (
        extract(
            epoch
            from ts
        ) * 1000
    )::bigint;
end;
$$ language plpgsql;