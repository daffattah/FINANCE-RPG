import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env'
  );
}

/**
 * Server-side Supabase client for Server Components / Route Handlers.
 * Reads and writes session cookies via @supabase/ssr so the session is
 * shared between the browser and the server. Respects RLS.
 */
export async function createSupabaseServerClient(): Promise<SupabaseClient> {
  const cookieStore = cookies();

  const client = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — set is not possible in read-only context.
          // The middleware will refresh the session.
        }
      },
    },
  });

  return client as unknown as SupabaseClient;
}
