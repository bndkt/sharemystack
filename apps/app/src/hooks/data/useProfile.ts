import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { AuthUser } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";
import { TableName } from "@/model/schema";

type ProfileSelector =
  | {
      user: AuthUser | null;
      slug?: never;
      stackTypeSlug?: string;
    }
  | {
      user?: never;
      slug: string | null;
      stackTypeSlug?: string;
    };

export function useProfile({ user, slug, stackTypeSlug }: ProfileSelector) {
  const database = useDatabase();
  const [profile, setProfile] = useState<Profile | null>();
  const [stacks, setStacks] = useState<Stack[] | null>();
  const [stack, setStack] = useState<Stack | null>();
  const [picks, setPicks] = useState<Pick[] | null>();

  const profilesCollection = database.collections.get<Profile>(
    TableName.PROFILES
  );

  const createProfile = user
    ? async ({ name, slug }: { name: string; slug: string }) => {
        await database.write(async () => {
          const profile = await profilesCollection.create((profile) => {
            profile.name = name;
            profile.slug = slug;
            profile.userId = user.id;
            profile.twitter = user.user_metadata.preferred_username;
            profile.twitterImageUrl = user.user_metadata.avatar_url;
          });
          setProfile(profile);
        });
      }
    : undefined;

  // Load profile
  useEffect(() => {
    // Query profile by user id or slug
    const profilesQuery = user
      ? profilesCollection.query([Q.where("user_id", user.id), Q.take(1)])
      : slug
      ? profilesCollection.query([Q.where("slug", Q.like(slug)), Q.take(1)])
      : undefined;

    if (profilesQuery) {
      const subscription = profilesQuery.observe().subscribe((data) => {
        setProfile(data[0] ?? null);
      });

      return () => subscription.unsubscribe();
    }
  }, [database, user, slug]);

  // If profile is loaded, load stacks
  useEffect(() => {
    if (profile) {
      const subscription = profile.stacks
        .extend(Q.sortBy("created_at", "desc"))
        .observe()
        .subscribe((data) => {
          setStacks(data ?? null);
        });

      return () => subscription.unsubscribe();
    }
  }, [profile]);

  // If profile is loaded, load stack (either using stack type slug or the most recently updated stack)
  useEffect(() => {
    if (profile) {
      const subscription = profile.stacks
        .extend(
          stackTypeSlug
            ? Q.where("stack_type_slug", Q.eq(stackTypeSlug))
            : Q.sortBy("updated_at", "desc"),
          Q.take(1)
        )
        .observe()
        .subscribe((data) => {
          setStack(data[0] ?? null);
        });

      return () => subscription.unsubscribe();
    }
  }, [profile, stackTypeSlug]);

  // If stack is loaded, load picks
  useEffect(() => {
    if (stack) {
      const subscription = stack.picks
        .extend(Q.sortBy("updated_at", "desc"))
        .observe()
        .subscribe((data) => {
          setPicks(data ?? null);
        });

      return () => subscription.unsubscribe();
    }
  }, [stack]);

  return { profile, createProfile, stacks, stack, picks };
}
