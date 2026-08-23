'use client';

import Link from 'next/link';
import { DashboardCard } from '@/components/dashboard/card';
import { Receipt, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTransactions } from '@/hooks/use-transactions';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatAmount(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function RecentTransactions() {
  const { transactions, loading } = useTransactions();
  const recent = transactions.slice(0, 4);

  return (
    <DashboardCard
      className="flex h-full flex-col"
      contentClassName="flex flex-1 flex-col"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Transactions
        </h3>
        <Link
          href="/transactions"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : recent.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
            <Receipt className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              No transactions yet
            </p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Your logged expenses and income will appear here once you start
              your journey.
            </p>
          </div>
        </div>
      ) : (
        <ul className="flex flex-1 flex-col divide-y divide-border/50">
          {recent.map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <li key={tx.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1',
                    isIncome
                      ? 'bg-income/10 text-income ring-income/20'
                      : 'bg-destructive/10 text-destructive ring-destructive/20'
                  )}
                >
                  {isIncome ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {tx.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(tx.date)} · {tx.category}
                  </p>
                </div>
                <p
                  className={cn(
                    'shrink-0 text-sm font-semibold tabular-nums',
                    isIncome ? 'text-income' : 'text-destructive'
                  )}
                >
                  {isIncome ? '+' : '−'}{formatAmount(tx.amount)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </DashboardCard>
  );
}
