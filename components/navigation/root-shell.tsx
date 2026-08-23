'use client';

import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/components/auth/auth-provider';
import { AppShell } from '@/components/navigation/app-shell';
import { Loader2 } from 'lucide-react';

const AUTH_ROUTES = ['/login', '/signup'];

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading } = useAuth();
  const isAuthRoute = AUTH_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  );

  if (isAuthRoute) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}

export function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppContent>{children}</AppContent>
    </AuthProvider>
  );
}
