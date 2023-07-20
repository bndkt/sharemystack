create policy "Users can update picks for their own stack." on picks for
update using (
        (
            select count(*)
            from stacks
            where stacks.id = picks.stack_id
                AND stacks.user_id = auth.uid()
        ) > 0
    ) with check (
        (
            select count(*)
            from stacks
            where stacks.id = picks.stack_id
                AND stacks.user_id = auth.uid()
        ) > 0
    );