import * as React from 'react';
import { cn } from '@/lib/utils';

type DashboardButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ElementType;
  iconClassName?: string;
  label: string;
};

export function DashboardButton({
  icon: Icon,
  iconClassName,
  label,
  className,
  ...props
}: DashboardButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'group flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/40 p-3 text-left transition-all hover:border-border hover:bg-secondary',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-md ring-1 transition-transform group-hover:scale-105',
          iconClassName
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </button>
  );
}
