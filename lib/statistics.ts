export type TimeRange = '7d' | '30d' | '3m' | '6m' | '1y';

export type RangeOption = {
  value: TimeRange;
  label: string;
};

export const rangeOptions: RangeOption[] = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '3m', label: '3 months' },
  { value: '6m', label: '6 months' },
  { value: '1y', label: '1 year' },
];

export type MonthlyPoint = {
  label: string;
  income: number;
  expense: number;
};

export type CategorySlice = {
  category: string;
  amount: number;
  fill: string;
};

export type TrendPoint = {
  label: string;
  value: number;
};

export type MultiTrendPoint = {
  label: string;
  xp: number;
  coins: number;
};

// --- Income vs Expense (monthly) ---
export const incomeVsExpenseData: MonthlyPoint[] = [
  { label: 'Jan', income: 1100000, expense: 720000 },
  { label: 'Feb', income: 1150000, expense: 810000 },
  { label: 'Mar', income: 1100000, expense: 690000 },
  { label: 'Apr', income: 1200000, expense: 880000 },
  { label: 'May', income: 1250000, expense: 740000 },
  { label: 'Jun', income: 1200000, expense: 910000 },
  { label: 'Jul', income: 1300000, expense: 760000 },
  { label: 'Aug', income: 1280000, expense: 742000 },
];

// --- Expense by Category (pie) ---
export const expenseByCategoryData: CategorySlice[] = [
  { category: 'Food', amount: 214500, fill: 'hsl(38 92% 52%)' },
  { category: 'Jajan/Snack', amount: 168000, fill: 'hsl(142 70% 40%)' },
  { category: 'Transportation', amount: 92000, fill: 'hsl(210 80% 55%)' },
  { category: 'School', amount: 41000, fill: 'hsl(280 65% 60%)' },
  { category: 'Entertainment', amount: 112000, fill: 'hsl(0 72% 50%)' },
  { category: 'Other', amount: 114500, fill: 'hsl(215 16% 55%)' },
];

// --- Monthly Spending ---
export const monthlySpendingData: TrendPoint[] = [
  { label: 'Jan', value: 720000 },
  { label: 'Feb', value: 810000 },
  { label: 'Mar', value: 690000 },
  { label: 'Apr', value: 880000 },
  { label: 'May', value: 740000 },
  { label: 'Jun', value: 910000 },
  { label: 'Jul', value: 760000 },
  { label: 'Aug', value: 742000 },
];

// --- Savings Growth ---
export const savingsGrowthData: TrendPoint[] = [
  { label: 'Jan', value: 380000 },
  { label: 'Feb', value: 340000 },
  { label: 'Mar', value: 410000 },
  { label: 'Apr', value: 320000 },
  { label: 'May', value: 510000 },
  { label: 'Jun', value: 290000 },
  { label: 'Jul', value: 540000 },
  { label: 'Aug', value: 538000 },
];

// --- Jajan Spending (weekly) ---
export const jajanSpendingData: TrendPoint[] = [
  { label: 'W1', value: 32000 },
  { label: 'W2', value: 48000 },
  { label: 'W3', value: 41000 },
  { label: 'W4', value: 47000 },
];

// --- XP Growth ---
export const xpGrowthData: TrendPoint[] = [
  { label: 'W1', value: 120 },
  { label: 'W2', value: 280 },
  { label: 'W3', value: 450 },
  { label: 'W4', value: 680 },
];

// --- Coin Growth ---
export const coinGrowthData: TrendPoint[] = [
  { label: 'W1', value: 40 },
  { label: 'W2', value: 95 },
  { label: 'W3', value: 160 },
  { label: 'W4', value: 250 },
];

export function formatCompact(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}
