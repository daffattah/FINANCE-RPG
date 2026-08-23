'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type MobileBottomNavProps = {
  items: { label: string; href: string; icon: LucideIcon }[];
};

export function MobileBottomNav({ items }: MobileBottomNavProps) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const primary = items.slice(0, 4);
  const secondary = items.slice(4);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-md lg:hidden"
      >
        <ul className="flex items-stretch justify-around">
          {primary.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 px-1 py-2.5 text-[10px] font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                    active
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li className="flex-1">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={moreOpen}
              aria-label="More navigation"
              onClick={() => setMoreOpen((v) => !v)}
              className={cn(
                'flex w-full flex-col items-center justify-center gap-1 px-1 py-2.5 text-[10px] font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                secondary.some((i) => isActive(i.href))
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span>More</span>
            </button>
          </li>
        </ul>
      </nav>

      {moreOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="More navigation"
          className="fixed inset-0 bottom-0 z-50 lg:hidden"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 bg-black/70"
            onClick={() => setMoreOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-border/60 bg-background p-4 pb-8 shadow-xl">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
            <ul className="grid grid-cols-2 gap-2">
              {secondary.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        active
                          ? 'bg-primary/10 text-primary ring-1 ring-primary/30'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      )}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
