'use client';

import { useState } from 'react';
import {
  BarChart3,
  ArrowDownRight,
  ArrowUpRight,
  PieChart as PieChartIcon,
  TrendingUp,
  PiggyBank,
  IceCream2,
  Zap,
  Coins,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import { DashboardCard } from '@/components/dashboard/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  type TimeRange,
  type TrendPoint,
  rangeOptions,
  incomeVsExpenseData,
  expenseByCategoryData,
  monthlySpendingData,
  savingsGrowthData,
  jajanSpendingData,
  xpGrowthData,
  coinGrowthData,
  formatCompact,
} from '@/lib/statistics';

function SectionHeader({
  icon: Icon,
  title,
  badge,
}: {
  icon: typeof BarChart3;
  title: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      </div>
      {badge && (
        <Badge variant="outline" className="text-xs text-muted-foreground">
          {badge}
        </Badge>
      )}
    </div>
  );
}

const incomeExpenseConfig = {
  income: { label: 'Income', color: 'hsl(142 70% 40%)' },
  expense: { label: 'Expense', color: 'hsl(0 72% 50%)' },
} satisfies ChartConfig;

const spendingConfig = {
  value: { label: 'Spending', color: 'hsl(38 92% 52%)' },
} satisfies ChartConfig;

const savingsConfig = {
  value: { label: 'Savings', color: 'hsl(142 70% 40%)' },
} satisfies ChartConfig;

const jajanConfig = {
  value: { label: 'Jajan/Snack', color: 'hsl(38 92% 52%)' },
} satisfies ChartConfig;

const xpConfig = {
  value: { label: 'XP', color: 'hsl(38 92% 52%)' },
} satisfies ChartConfig;

const coinConfig = {
  value: { label: 'Coins', color: 'hsl(43 92% 50%)' },
} satisfies ChartConfig;

const categoryConfig = {
  amount: { label: 'Category' },
} satisfies ChartConfig;

function IncomeVsExpenseChart() {
  return (
    <DashboardCard contentClassName="space-y-4">
      <SectionHeader icon={ArrowDownRight} title="Income vs Expense" badge="Monthly" />
      <ChartContainer config={incomeExpenseConfig} className="h-[240px] w-full">
        <BarChart data={incomeVsExpenseData} barGap={4}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={formatCompact}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </DashboardCard>
  );
}

function ExpenseByCategoryChart() {
  return (
    <DashboardCard contentClassName="space-y-4">
      <SectionHeader icon={PieChartIcon} title="Expense by Category" badge="This month" />
      <ChartContainer config={categoryConfig} className="h-[240px] w-full">
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="category" hideLabel />}
          />
          <Pie
            data={expenseByCategoryData}
            dataKey="amount"
            nameKey="category"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={2}
          >
            {expenseByCategoryData.map((entry) => (
              <Cell key={entry.category} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
        {expenseByCategoryData.map((c) => (
          <span key={c.category} className="flex items-center gap-1.5 text-muted-foreground">
            <span
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{ backgroundColor: c.fill }}
            />
            {c.category}
          </span>
        ))}
      </div>
    </DashboardCard>
  );
}

function TrendChartCard({
  icon,
  title,
  badge,
  data,
  config,
  colorVar,
}: {
  icon: typeof BarChart3;
  title: string;
  badge: string;
  data: TrendPoint[];
  config: ChartConfig;
  colorVar: string;
}) {
  return (
    <DashboardCard contentClassName="space-y-4">
      <SectionHeader icon={icon} title={title} badge={badge} />
      <ChartContainer config={config} className="h-[200px] w-full">
        <LineChart data={data} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={44}
            tickFormatter={formatCompact}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={colorVar}
            strokeWidth={2.5}
            dot={{ r: 3, fill: colorVar }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </DashboardCard>
  );
}

export function StatisticsView() {
  const [range, setRange] = useState<TimeRange>('30d');
  const rangeLabel = rangeOptions.find((r) => r.value === range)?.label ?? '30 days';

  return (
    <div className="space-y-5">
      {/* Header + filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Statistics</h2>
            <p className="text-xs text-muted-foreground">
              Charts and insights about your financial progress.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Range</span>
          <Select value={range} onValueChange={(v) => setRange(v as TimeRange)}>
            <SelectTrigger className="w-[130px]" aria-label="Select time range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {rangeOptions.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        Showing data for {rangeLabel} — placeholder figures only.
      </p>

      <div className="grid gap-5 lg:grid-cols-2">
        <IncomeVsExpenseChart />
        <ExpenseByCategoryChart />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <TrendChartCard
          icon={TrendingUp}
          title="Monthly Spending"
          badge={rangeLabel}
          data={monthlySpendingData}
          config={spendingConfig}
          colorVar="var(--color-value)"
        />
        <TrendChartCard
          icon={PiggyBank}
          title="Savings Growth"
          badge={rangeLabel}
          data={savingsGrowthData}
          config={savingsConfig}
          colorVar="var(--color-value)"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <TrendChartCard
          icon={IceCream2}
          title="Jajan Spending"
          badge="Weekly"
          data={jajanSpendingData}
          config={jajanConfig}
          colorVar="var(--color-value)"
        />
        <TrendChartCard
          icon={Zap}
          title="XP Growth"
          badge="Weekly"
          data={xpGrowthData}
          config={xpConfig}
          colorVar="var(--color-value)"
        />
        <TrendChartCard
          icon={Coins}
          title="Coin Growth"
          badge="Weekly"
          data={coinGrowthData}
          config={coinConfig}
          colorVar="var(--color-value)"
        />
      </div>

      <footer className="pt-2 text-center">
        <p className="text-[11px] text-muted-foreground">
          Placeholder data — all figures are examples and not real financial calculations.
        </p>
      </footer>
    </div>
  );
}
