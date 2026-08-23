'use client';

import { ClipboardList, Wallet, Tag, IceCream2 } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  type Budget,
  type BudgetStatus,
  type CategoryBudget,
  periodBudgets,
  categoryBudgets,
  percentageUsed,
  remaining,
  statusFor,
  statusStyles,
} from '@/lib/budget';

const currency = 'Rp';

function formatCurrency(n: number): string {
  return `${currency} ${n.toLocaleString('en-US')}`;
}

function StatusBadge({ status }: { status: BudgetStatus }) {
  const s = statusStyles[status];
  return (
    <Badge
      variant="outline"
      className={cn('gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wide', s.badge)}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
      {status}
    </Badge>
  );
}

function BudgetRow({
  budget,
  spent,
  label,
  sublabel,
}: {
  budget: number;
  spent: number;
  label: string;
  sublabel?: string;
}) {
  const pct = percentageUsed(budget, spent);
  const left = remaining(budget, spent);
  const status = statusFor(budget, spent);
  const s = statusStyles[status];

  return (
    <div className={cn('rounded-lg ring-1 p-4 transition-colors', s.ring, 'bg-secondary/30')}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{label}</p>
          {sublabel && (
            <p className="mt-0.5 text-xs text-muted-foreground">{sublabel}</p>
          )}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="uppercase tracking-wide text-muted-foreground">Budget</p>
          <p className="mt-0.5 font-semibold tabular-nums text-foreground">
            {formatCurrency(budget)}
          </p>
        </div>
        <div>
          <p className="uppercase tracking-wide text-muted-foreground">Spent</p>
          <p className="mt-0.5 font-semibold tabular-nums text-foreground">
            {formatCurrency(spent)}
          </p>
        </div>
        <div>
          <p className="uppercase tracking-wide text-muted-foreground">Remaining</p>
          <p
            className={cn(
              'mt-0.5 font-semibold tabular-nums',
              left <= 0 ? 'text-destructive' : 'text-accent'
            )}
          >
            {formatCurrency(left)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <Progress value={pct} className={cn('h-2.5', s.bar)} />
        <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
          {pct}%
        </span>
      </div>
    </div>
  );
}

function PeriodBudgetCard() {
  return (
    <DashboardCard contentClassName="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Period Budgets
          </h3>
        </div>
        <Badge variant="outline" className="text-xs text-muted-foreground">
          {periodBudgets.length} periods
        </Badge>
      </div>

      <div className="space-y-3">
        {periodBudgets.map((b: Budget) => (
          <BudgetRow
            key={b.id}
            label={b.label}
            sublabel={b.period}
            budget={b.budget}
            spent={b.spent}
          />
        ))}
      </div>
    </DashboardCard>
  );
}

function CategoryBudgetCard() {
  return (
    <DashboardCard contentClassName="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Tag className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Category Budgets
          </h3>
        </div>
        <Badge variant="outline" className="text-xs text-muted-foreground">
          {categoryBudgets.filter((c) => c.category !== 'Jajan/Snack').length} categories
        </Badge>
      </div>

      <div className="space-y-3">
        {categoryBudgets
          .filter((c) => c.category !== 'Jajan/Snack')
          .map((c: CategoryBudget) => (
            <BudgetRow
              key={c.id}
              label={c.category}
              sublabel="Monthly"
              budget={c.budget}
              spent={c.spent}
            />
          ))}
      </div>
    </DashboardCard>
  );
}

function JajanBudgetCard() {
  const jajan = categoryBudgets.find((c) => c.category === 'Jajan/Snack');
  if (!jajan) return null;
  const status = statusFor(jajan.budget, jajan.spent);
  const s = statusStyles[status];
  const pct = percentageUsed(jajan.budget, jajan.spent);
  const left = remaining(jajan.budget, jajan.spent);

  return (
    <DashboardCard contentClassName="space-y-4" className="ring-1 ring-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <IceCream2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Jajan / Snack Budget</h3>
            <p className="text-xs text-muted-foreground">
              A light way to keep snack spending in view.
            </p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-lg bg-secondary/40 p-4 ring-1 ring-border/60">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Budget</p>
          <p className="mt-1 text-sm font-bold tabular-nums text-foreground">
            {formatCurrency(jajan.budget)}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Spent</p>
          <p className="mt-1 text-sm font-bold tabular-nums text-foreground">
            {formatCurrency(jajan.spent)}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Remaining</p>
          <p
            className={cn(
              'mt-1 text-sm font-bold tabular-nums',
              left <= 0 ? 'text-destructive' : 'text-accent'
            )}
          >
            {formatCurrency(left)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Progress value={pct} className={cn('h-3', s.bar)} />
        <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
          {pct}%
        </span>
      </div>

      <p className="text-xs text-muted-foreground">
        This is just a snapshot of your snack spending this month — not a rule.
        Treats are fine; this simply helps you notice patterns.
      </p>
    </DashboardCard>
  );
}

export function BudgetView() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
          <ClipboardList className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Budget</h2>
          <p className="text-xs text-muted-foreground">
            Track spending against your limits across periods and categories.
          </p>
        </div>
      </div>

      <JajanBudgetCard />

      <div className="grid gap-5 lg:grid-cols-2">
        <PeriodBudgetCard />
        <CategoryBudgetCard />
      </div>

      <footer className="pt-2 text-center">
        <p className="text-[11px] text-muted-foreground">
          Placeholder data — figures shown are examples and not real financial calculations.
        </p>
      </footer>
    </div>
  );
}
