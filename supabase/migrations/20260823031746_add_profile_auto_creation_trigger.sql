/*
# Auto-create profile on user signup

## Purpose
When a new user registers via Supabase Auth, automatically insert a
corresponding row into the `profiles` table so the profile exists before
the user first loads the app. This avoids a race where the frontend
queries for a profile that hasn't been created yet.

## 1. New Functions
- `public.handle_new_user()`
  - SECURITY DEFINER function that inserts a new `profiles` row using
    the incoming user's id and email-derived username.
  - Runs with elevated privileges so it can INSERT into `profiles`
    even though the trigger fires before the user has an authenticated
    session token (the user is being created at that moment).

## 2. New Triggers
- `on_auth_user_created`
  - Fires AFTER INSERT on `auth.users`.
  - Calls `handle_new_user()` for each new row.

## 3. Security
- The function is SECURITY DEFINER so it can write to `profiles`
  regardless of the caller's role.
- Search path is set explicitly to `public` to prevent search_path
  injection.
- EXECUTE on the function is granted to the `postgres` role only —
  the trigger (owned by postgres) is the only caller.
- The existing RLS policies on `profiles` are unchanged: each
  authenticated user can only SELECT/INSERT/UPDATE/DELETE their own row.

## 4. Important Notes
- This is idempotent: if a profile row already exists for the user id,
  the INSERT is skipped (ON CONFLICT DO NOTHING).
- Username defaults to the part of the email before the @ sign.
- No transaction, XP, or coin logic is implemented — defaults are used.
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    split_part(NEW.email, '@', 1)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
