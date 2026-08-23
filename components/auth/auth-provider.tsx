'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/lib/supabase/client';
import type { Profile } from '@/lib/supabase/types';

type AuthState = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (uid: string) => {
    const { data, error } = await supabaseBrowser
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();

    if (error) {
      console.error('Failed to load profile:', error.message);
      return;
    }
    setProfile(data as Profile | null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    let mounted = true;

    supabaseBrowser.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      const current = session?.user ?? null;
      setUser(current);
      if (current) {
        fetchProfile(current.id).finally(() => mounted && setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: authListener } = supabaseBrowser.auth.onAuthStateChange(
      (event, session) => {
        (async () => {
          const current = session?.user ?? null;
          setUser(current);
          if (current) {
            await fetchProfile(current.id);
          } else {
            setProfile(null);
          }
          setLoading(false);
        })();
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signOut = useCallback(async () => {
    await supabaseBrowser.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
