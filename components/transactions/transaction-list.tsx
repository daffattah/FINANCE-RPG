'use client';

import { useMemo, useState } from 'react';
import { Search, Receipt, Trash2, Pencil, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  type Transaction,
  type TransactionType,
  incomeCategories,
  expenseCategories,
} from '@/lib/transactions';

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit?: (tx: Transaction) => void;
  limit?: number;
};

type TypeFilter = 'all' | TransactionType;

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatAmount(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const allCategories = [...incomeCategories, ...expenseCategories];

export function TransactionList({
  transactions,
  onDelete,
  onEdit,
  limit,
}: TransactionListProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    const result = transactions
      .filter((tx) => {
        if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
        if (categoryFilter !== 'all' && tx.category !== categoryFilter) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          const matches =
            tx.description.toLowerCase().includes(q) ||
            tx.category.toLowerCase().includes(q) ||
            tx.notes?.toLowerCase().includes(q) ||
            tx.payment_method.toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const dateCmp = b.date.localeCompare(a.date);
        if (dateCmp !== 0) return dateCmp;
        return b.created_at.localeCompare(a.created_at);
      });

    return limit ? result.slice(0, limit) : result;
  }, [transactions, search, typeFilter, categoryFilter, limit]);

  const hasFilters = search.trim() || typeFilter !== 'all' || categoryFilter !== 'all';
  const showFilters = !limit;

  return (
    <DashboardCard contentClassName="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {limit ? 'Recent Transactions' : 'All Transactions'}
        </h3>
        <Badge variant="outline" className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
        </Badge>
      </div>

      {showFilters && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search description, category, notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search transactions"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            <Select
              value={typeFilter}
              onValueChange={(v) => setTypeFilter(v as TypeFilter)}
            >
              <SelectTrigger aria-label="Filter by type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger aria-label="Filter by category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
            <Receipt className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              {hasFilters ? 'No matching transactions' : 'No transactions yet'}
            </p>
            <p className="max-w-xs text-xs text-muted-foreground">
              {hasFilters
                ? 'Try adjusting your search or filters.'
                : 'Click "Add Transaction" to log your first entry.'}
            </p>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-border/50">
          {filtered.map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <li
                key={tx.id}
                className="group flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1',
                    isIncome
                      ? 'bg-income/10 text-income ring-income/20'
                      : 'bg-destructive/10 text-destructive ring-destructive/20'
                  )}
                >
                  {isIncome ? (
                    <ArrowDownRight className="h-5 w-5" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {tx.description}
                    </p>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                    <span>{formatDate(tx.date)}</span>
                    <span className="text-border">·</span>
                    <span>{tx.category}</span>
                    <span className="text-border">·</span>
                    <span>{tx.payment_method}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className={cn(
                      'text-sm font-semibold tabular-nums',
                      isIncome ? 'text-income' : 'text-destructive'
                    )}
                  >
                    {isIncome ? '+' : '−'}
                    {formatAmount(tx.amount)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => onEdit(tx)}
                      aria-label={`Edit transaction: ${tx.description}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(tx.id)}
                    aria-label={`Delete transaction: ${tx.description}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </DashboardCard>
  );
}
