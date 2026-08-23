'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Coins, Swords } from 'lucide-react';
import type { ReactNode } from 'react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useAuth } from '@/components/auth/auth-provider';

type DashboardHeaderProps = {
  mobileNav?: ReactNode;
};

export function DashboardHeader({ mobileNav }: DashboardHeaderProps) {
  const { user, profile } = useAuth();
  const displayName = profile?.username || user?.email || 'Player';
  const initials = displayName.charAt(0).toUpperCase();
  const coins = profile?.coins ?? 0;

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:mx-auto lg:max-w-6xl">
        <div className="flex items-center gap-2.5">
          {mobileNav}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30 lg:hidden">
            <Swords className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-foreground sm:text-base">
              My Finance RPG
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:block">
              Level up your money
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Badge
            variant="outline"
            className="hidden gap-1.5 border-primary/30 bg-primary/10 px-2.5 py-1 text-primary sm:flex"
          >
            <Coins className="h-3.5 w-3.5" />
            <span className="font-semibold tabular-nums">{coins}</span>
          </Badge>
          <Avatar className="h-9 w-9 ring-1 ring-border">
            <AvatarFallback className="bg-secondary text-xs font-semibold text-muted-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
