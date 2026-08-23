'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Swords, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const isSignup = mode === 'signup';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        const { error: signUpError } = await supabaseBrowser.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } =
          await supabaseBrowser.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(translateError(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
          <Swords className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignup
              ? 'Start leveling up your money skills today.'
              : 'Sign in to continue your financial journey.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="pl-9"
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder={isSignup ? 'At least 6 characters' : 'Your password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              className="pl-9"
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive ring-1 ring-destructive/20">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {isSignup ? 'Create account' : 'Sign in'}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link
          href={isSignup ? '/login' : '/signup'}
          className="font-semibold text-primary hover:underline"
        >
          {isSignup ? 'Sign in' : 'Sign up'}
        </Link>
      </p>
    </div>
  );
}

function translateError(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('invalid login credentials')) return 'Incorrect email or password.';
  if (lower.includes('user already registered')) return 'An account with this email already exists.';
  if (lower.includes('password should be at least')) return 'Password must be at least 6 characters.';
  return msg;
}
