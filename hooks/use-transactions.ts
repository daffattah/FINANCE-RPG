'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import type { Transaction, TransactionInput } from '@/lib/transactions';

type UseTransactionsResult = {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  createTransaction: (input: TransactionInput) => Promise<Transaction | null>;
  updateTransaction: (id: string, input: TransactionInput) => Promise<Transaction | null>;
  deleteTransaction: (id: string) => Promise<boolean>;
  refresh: () => Promise<void>;
};

function fromRow(row: Record<string, unknown>): Transaction {
  return {
    id: row.id as string,
    user_id: row.user_id as string,
    date: row.date as string,
    type: row.type as Transaction['type'],
    amount: Number(row.amount),
    category: row.category as string,
    description: row.description as string,
    payment_method: row.payment_method as Transaction['payment_method'],
    notes: (row.notes as string | null) ?? null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

export function useTransactions(): UseTransactionsResult {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: queryError } = await supabaseBrowser
      .from('transactions')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });

    if (queryError) {
      setError(queryError.message);
      setTransactions([]);
    } else {
      setTransactions((data ?? []).map(fromRow));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createTransaction = useCallback(
    async (input: TransactionInput): Promise<Transaction | null> => {
      const { data, error: insertError } = await supabaseBrowser
        .from('transactions')
        .insert({
          date: input.date,
          type: input.type,
          amount: input.amount,
          category: input.category,
          description: input.description,
          payment_method: input.payment_method,
          notes: input.notes ?? null,
        })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
        return null;
      }

      const tx = fromRow(data);
      setTransactions((prev) => [tx, ...prev]);
      return tx;
    },
    []
  );

  const updateTransaction = useCallback(
    async (id: string, input: TransactionInput): Promise<Transaction | null> => {
      const { data, error: updateError } = await supabaseBrowser
        .from('transactions')
        .update({
          date: input.date,
          type: input.type,
          amount: input.amount,
          category: input.category,
          description: input.description,
          payment_method: input.payment_method,
          notes: input.notes ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
        return null;
      }

      const updated = fromRow(data);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
      return updated;
    },
    []
  );

  const deleteTransaction = useCallback(async (id: string): Promise<boolean> => {
    const { error: deleteError } = await supabaseBrowser
      .from('transactions')
      .delete()
      .eq('id', id);

    if (deleteError) {
      setError(deleteError.message);
      return false;
    }

    setTransactions((prev) => prev.filter((t) => t.id !== id));
    return true;
  }, []);

  return {
    transactions,
    loading,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    refresh,
  };
}
