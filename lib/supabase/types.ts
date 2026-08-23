import type { SupabaseClient } from '@supabase/supabase-js';

export type NextServerClient = SupabaseClient;

export type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  level: number;
  xp: number;
  coins: number;
  created_at: string;
  updated_at: string;
};

export type ProfileInsert = {
  id: string;
  username?: string | null;
  avatar_url?: string | null;
  level?: number;
  xp?: number;
  coins?: number;
};

export type ProfileUpdate = {
  username?: string | null;
  avatar_url?: string | null;
  level?: number;
  xp?: number;
  coins?: number;
};

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthSession = {
  user: AuthUser | null;
  profile: Profile | null;
};
