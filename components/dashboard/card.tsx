import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type DashboardCardProps = React.HTMLAttributes<HTMLDivElement> & {
  contentClassName?: string;
};

export const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ className, contentClassName, children, ...props }, ref) => (
    <Card ref={ref} className={cn('card-rpg border-border/60', className)} {...props}>
      <CardContent className={cn('p-5 sm:p-6', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
);
DashboardCard.displayName = 'DashboardCard';
