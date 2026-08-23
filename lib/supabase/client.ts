import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env'
  );
}

/**
 * Browser-side Supabase client.
 * Uses the anon key — respects Row Level Security policies.
 * Session is persisted in cookies by @supabase/ssr for SSR compatibility.
 */
export const supabaseBrowser = createBrowserClient(supabaseUrl, supabaseAnonKey);
