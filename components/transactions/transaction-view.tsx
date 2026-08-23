'use client';

import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Wallet, Loader2 } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/card';
import { Button } from '@/components/ui/button';
import { TransactionFormModal } from '@/components/transactions/transaction-form-modal';
import { TransactionList } from '@/components/transactions/transaction-list';
import { useTransactions } from '@/hooks/use-transactions';
import { type Transaction, type TransactionInput } from '@/lib/transactions';
import { cn } from '@/lib/utils';

export function TransactionView() {
  const {
    transactions,
    loading,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  function handleAdd() {
    setEditingTx(null);
    setModalOpen(true);
  }

  function handleEdit(tx: Transaction) {
    setEditingTx(tx);
    setModalOpen(true);
  }

  async function handleSubmit(input: TransactionInput) {
    if (editingTx) {
      await updateTransaction(editingTx.id, input);
    } else {
      await createTransaction(input);
    }
    setEditingTx(null);
  }

  async function handleDelete(id: string) {
    await deleteTransaction(id);
  }

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <SummaryStat
          label="Income"
          value={totalIncome}
          icon={TrendingUp}
          className="text-income"
        />
        <SummaryStat
          label="Expense"
          value={totalExpense}
          icon={TrendingDown}
          className="text-destructive"
        />
        <SummaryStat
          label="Balance"
          value={balance}
          icon={Wallet}
          className={cn(balance >= 0 ? 'text-foreground' : 'text-destructive')}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-foreground">Transactions</h1>
          <p className="text-xs text-muted-foreground">
            All your income and expenses, saved to your account.
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive ring-1 ring-destructive/20">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <TransactionList
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <TransactionFormModal
        open={modalOpen}
        onOpenChange={(v) => {
          setModalOpen(v);
          if (!v) setEditingTx(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingTx}
      />
    </div>
  );
}

function SummaryStat({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string;
  value: number;
  icon: typeof TrendingUp;
  className?: string;
}) {
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <DashboardCard contentClassName="space-y-1.5 p-4">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className={cn('text-base font-bold tabular-nums sm:text-lg', className)}>
        {value < 0 ? '−' : ''}{formatted}
      </p>
    </DashboardCard>
  );
}
