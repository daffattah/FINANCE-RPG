/*
# Create profiles table

## Purpose
Stores per-user profile information for the My Finance RPG app.
Each row is linked 1:1 to an auth.users entry via its primary key.

## 1. New Tables
- `profiles`
  - `id` (uuid, primary key) — matches the auth.users id; a new profile row
    is expected to be created when a user signs up.
  - `username` (text, nullable) — optional display name shown on the player card.
  - `avatar_url` (text, nullable) — optional avatar image URL.
  - `level` (integer, not null, default 1) — player level. Column exists for
    future use; XP/level logic is NOT implemented in this task.
  - `xp` (integer, not null, default 0) — experience points. Column exists for
    future use; XP logic is NOT implemented in this task.
  - `coins` (integer, not null, default 0) — in-app currency. Column exists for
    future use; coin logic is NOT implemented in this task.
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

## 2. Security
- Row Level Security is ENABLED on `profiles`.
- Four separate owner-scoped policies (SELECT / INSERT / UPDATE / DELETE),
  each restricted to `authenticated` and checked against `auth.uid() = id`.
  Each user can only read and modify their own profile row.
- No `TO anon` policies: this app will have a sign-in screen, so the anon key
  should not be able to read or write profile data.

## 3. Important Notes
- This migration creates the minimum schema for the profiles table only.
- No transactions, XP, or coin logic is implemented — the columns are placeholders.
- The `id` column has no DEFAULT because it is expected to be supplied from the
  authenticated user's id at signup time.
- A trigger to auto-create a profile row on new user signup is intentionally
  omitted in this task; it can be added in a later migration.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text,
  avatar_url text,
  level integer NOT NULL DEFAULT 1,
  xp integer NOT NULL DEFAULT 0,
  coins integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);
