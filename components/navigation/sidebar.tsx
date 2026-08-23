'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Swords, LogOut } from 'lucide-react';
import { navItems } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/auth-provider';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useAuth();

  const displayName = profile?.username || user?.email || 'Player';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <aside
      aria-label="Primary"
      className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border/60 bg-card/40 backdrop-blur-sm lg:flex"
    >
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-border/60 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
          <Swords className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">
            Finance RPG
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            Level up your money
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                active
                  ? 'bg-primary/10 text-primary ring-1 ring-primary/30'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon
                className={cn(
                  'h-[18px] w-[18px] shrink-0 transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 space-y-3 border-t border-border/60 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Theme
          </span>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-secondary/60 px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary ring-1 ring-primary/30">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-foreground">{displayName}</p>
            <p className="truncate text-[10px] text-muted-foreground">Level {profile?.level ?? 1}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            aria-label="Sign out"
            onClick={() => {
              signOut();
              router.push('/login');
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
