'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Sidebar } from '@/components/navigation/sidebar';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { navItems } from '@/lib/nav';
import { MobileBottomNav } from '@/components/navigation/mobile-bottom-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-60">
        <DashboardHeader mobileNav={<MobileNav />} />
        <main className="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:pb-8">
          {children}
        </main>
      </div>
      <MobileBottomNav items={navItems} />
    </div>
  );
}
