/*
# Create transactions table

## Purpose
Persist per-user income and expense transactions so they survive across
sessions and devices. Each user can only access their own transactions.

## 1. New Tables
- `transactions`
  - `id` (uuid, primary key, auto-generated)
  - `user_id` (uuid, not null, defaults to the authenticated user) —
    foreign key to auth.users, cascades on delete.
  - `date` (date, not null) — the date the transaction occurred.
  - `type` (text, not null) — either 'income' or 'expense'.
  - `amount` (numeric(12,2), not null) — the transaction amount; must be > 0.
  - `category` (text, not null) — spending/income category.
  - `description` (text, not null) — short description.
  - `payment_method` (text, not null) — how the transaction was paid.
  - `notes` (text, nullable) — optional extra details.
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

## 2. Indexes
- `idx_transactions_user_id` on `user_id` — speeds up per-user queries.
- `idx_transactions_user_date` on `(user_id, date DESC)` — speeds up
  "recent transactions" and date-range queries.
- `idx_transactions_user_type` on `(user_id, type)` — speeds up
  income/expense filtering and summary calculations.

## 3. Security
- Row Level Security is ENABLED on `transactions`.
- Four separate owner-scoped policies (SELECT / INSERT / UPDATE / DELETE),
  each restricted to `authenticated` and checked against `auth.uid() = user_id`.
- `user_id` defaults to `auth.uid()` so inserts that omit it still satisfy
  the INSERT policy's WITH CHECK.

## 4. Important Notes
- The `amount` column uses numeric(12,2) for precise currency storage.
- A CHECK constraint ensures `type` is only 'income' or 'expense'.
- A CHECK constraint ensures `amount` is always positive.
- No XP or budget calculation logic is implemented in this task.
*/

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  category text NOT NULL,
  description text NOT NULL,
  payment_method text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_type ON transactions(user_id, type);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_transactions" ON transactions;
CREATE POLICY "select_own_transactions" ON transactions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_transactions" ON transactions;
CREATE POLICY "insert_own_transactions" ON transactions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_transactions" ON transactions;
CREATE POLICY "update_own_transactions" ON transactions FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_transactions" ON transactions;
CREATE POLICY "delete_own_transactions" ON transactions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
