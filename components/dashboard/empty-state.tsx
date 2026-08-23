import type { LucideIcon } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/card';
import { cn } from '@/lib/utils';

type EmptyStateProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
};

export function EmptyState({
  title,
  description,
  icon: Icon,
  iconClassName,
}: EmptyStateProps) {
  return (
    <DashboardCard className="flex min-h-[60vh] flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
        <div
          className={cn(
            'flex h-16 w-16 items-center justify-center rounded-full bg-secondary ring-1 ring-border',
            iconClassName
          )}
        >
          <Icon className="h-7 w-7 text-muted-foreground" />
        </div>
        <div className="space-y-1.5">
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </DashboardCard>
  );
}
