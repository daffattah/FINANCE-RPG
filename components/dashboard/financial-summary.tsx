import { DashboardCard } from '@/components/dashboard/card';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';

const PLACEHOLDER = {
  balance: 0,
  income: 0,
  expenses: 0,
};

function formatMoney(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

type Tone = 'balance' | 'income' | 'expense';

type Stat = {
  label: string;
  value: number;
  icon: React.ElementType;
  tone: Tone;
};

const stats: Stat[] = [
  { label: 'Balance', value: PLACEHOLDER.balance, icon: Wallet, tone: 'balance' },
  { label: 'Income', value: PLACEHOLDER.income, icon: ArrowUpRight, tone: 'income' },
  { label: 'Expenses', value: PLACEHOLDER.expenses, icon: ArrowDownLeft, tone: 'expense' },
];

const toneClasses: Record<Tone, { ring: string; text: string; bg: string }> = {
  balance: { ring: 'ring-primary/20', text: 'text-primary', bg: 'bg-primary/10' },
  income: { ring: 'ring-income/20', text: 'text-income', bg: 'bg-income/10' },
  expense: { ring: 'ring-expense/20', text: 'text-expense', bg: 'bg-expense/10' },
};

export function FinancialSummary() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const tone = toneClasses[stat.tone];
        const Icon = stat.icon;
        return (
          <DashboardCard
            key={stat.label}
            className="transition-colors hover:border-border"
            contentClassName="flex items-center gap-4 p-5"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tone.bg} ring-1 ${tone.ring}`}
            >
              <Icon className={`h-5 w-5 ${tone.text}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <p className="truncate text-xl font-bold tabular-nums text-foreground sm:text-2xl">
                {formatMoney(stat.value)}
              </p>
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
}
