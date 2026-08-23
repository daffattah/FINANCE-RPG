'use client';

import { DashboardCard } from '@/components/dashboard/card';
import { QuickAction } from '@/components/dashboard/quick-action';
import { ClipboardList, Plus, ScrollText } from 'lucide-react';

const actions = [
  {
    label: 'Add Transaction',
    icon: Plus,
    accent: 'text-primary bg-primary/10 ring-primary/25',
  },
  {
    label: 'View Budget',
    icon: ClipboardList,
    accent: 'text-chart-3 bg-chart-3/10 ring-chart-3/25',
  },
  {
    label: 'View Quests',
    icon: ScrollText,
    accent: 'text-accent bg-accent/10 ring-accent/25',
  },
] as const;

export function QuickActions() {
  return (
    <DashboardCard>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Quick Actions
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {actions.map((action) => (
          <QuickAction
            key={action.label}
            label={action.label}
            icon={action.icon}
            accent={action.accent}
          />
        ))}
      </div>
    </DashboardCard>
  );
}
