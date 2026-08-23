export type BudgetStatus = 'SAFE' | 'CAUTION' | 'NEAR LIMIT' | 'OVER BUDGET';

export type BudgetPeriod = 'Daily' | 'Weekly' | 'Monthly';

export type Budget = {
  id: string;
  label: string;
  period: BudgetPeriod;
  budget: number;
  spent: number;
};

export type CategoryBudget = {
  id: string;
  category: string;
  budget: number;
  spent: number;
};

const safe = 0;
const caution = 50;
const nearLimit = 80;

export function percentageUsed(budget: number, spent: number): number {
  if (budget <= 0) return 0;
  return Math.min(100, Math.round((spent / budget) * 100));
}

export function remaining(budget: number, spent: number): number {
  return Math.max(0, budget - spent);
}

export function statusFor(budget: number, spent: number): BudgetStatus {
  if (budget <= 0) return 'SAFE';
  const pct = (spent / budget) * 100;
  if (pct >= 100) return 'OVER BUDGET';
  if (pct >= nearLimit) return 'NEAR LIMIT';
  if (pct >= caution) return 'CAUTION';
  return 'SAFE';
}

export const periodBudgets: Budget[] = [
  {
    id: 'daily',
    label: 'Daily Budget',
    period: 'Daily',
    budget: 50000,
    spent: 18500,
  },
  {
    id: 'weekly',
    label: 'Weekly Budget',
    period: 'Weekly',
    budget: 300000,
    spent: 176500,
  },
  {
    id: 'monthly',
    label: 'Monthly Budget',
    period: 'Monthly',
    budget: 1200000,
    spent: 742000,
  },
];

export const categoryBudgets: CategoryBudget[] = [
  {
    id: 'jajan',
    category: 'Jajan/Snack',
    budget: 200000,
    spent: 168000,
  },
  {
    id: 'food',
    category: 'Food',
    budget: 350000,
    spent: 214500,
  },
  {
    id: 'transport',
    category: 'Transportation',
    budget: 150000,
    spent: 92000,
  },
  {
    id: 'school',
    category: 'School',
    budget: 100000,
    spent: 41000,
  },
  {
    id: 'entertainment',
    category: 'Entertainment',
    budget: 120000,
    spent: 112000,
  },
];

export const statusStyles: Record<
  BudgetStatus,
  { badge: string; ring: string; bar: string; dot: string }
> = {
  SAFE: {
    badge: 'border-accent/30 bg-accent/10 text-accent',
    ring: 'ring-accent/20',
    bar: '[&>[role=progressbar]>span]:bg-accent',
    dot: 'bg-accent',
  },
  CAUTION: {
    badge: 'border-primary/30 bg-primary/10 text-primary',
    ring: 'ring-primary/20',
    bar: '[&>[role=progressbar]>span]:bg-primary',
    dot: 'bg-primary',
  },
  'NEAR LIMIT': {
    badge: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-500/20',
    bar: '[&>[role=progressbar]>span]:bg-amber-500',
    dot: 'bg-amber-500',
  },
  'OVER BUDGET': {
    badge: 'border-destructive/30 bg-destructive/10 text-destructive',
    ring: 'ring-destructive/20',
    bar: '[&>[role=progressbar]>span]:bg-destructive',
    dot: 'bg-destructive',
  },
};
