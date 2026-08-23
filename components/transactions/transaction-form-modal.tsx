'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  type TransactionInput,
  type TransactionType,
  type PaymentMethod,
  categoriesForType,
  paymentMethods,
} from '@/lib/transactions';

type TransactionFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: TransactionInput) => void;
  initialData?: Transaction | null;
};

export function TransactionFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: TransactionFormModalProps) {
  const today = new Date().toISOString().split('T')[0];
  const isEdit = !!initialData;

  const [date, setDate] = useState(initialData?.date ?? today);
  const [type, setType] = useState<TransactionType>(initialData?.type ?? 'expense');
  const [amount, setAmount] = useState(
    initialData ? String(initialData.amount) : ''
  );
  const [category, setCategory] = useState(initialData?.category ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    initialData?.payment_method ?? 'Cash'
  );
  const [notes, setNotes] = useState(initialData?.notes ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableCategories = categoriesForType(type);

  function resetForm() {
    setDate(today);
    setType('expense');
    setAmount('');
    setCategory('');
    setDescription('');
    setPaymentMethod('Cash');
    setNotes('');
    setErrors({});
  }

  function handleTypeChange(newType: TransactionType) {
    setType(newType);
    setCategory('');
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!date) e.date = 'Date is required';
    if (!amount || parseFloat(amount) <= 0) e.amount = 'Enter a valid amount';
    if (!category) e.category = 'Select a category';
    if (!description.trim()) e.description = 'Description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      date,
      type,
      amount: parseFloat(amount),
      category,
      description: description.trim(),
      payment_method: paymentMethod,
      notes: notes.trim() || null,
    });
    resetForm();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) resetForm();
        onOpenChange(v);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the details of this transaction.'
              : 'Log a new income or expense entry to track your finances.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={cn(
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  type === 'expense'
                    ? 'border-destructive/40 bg-destructive/10 text-destructive'
                    : 'border-input bg-background text-muted-foreground hover:text-foreground'
                )}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={cn(
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  type === 'income'
                    ? 'border-income/40 bg-income/10 text-income'
                    : 'border-input bg-background text-muted-foreground hover:text-foreground'
                )}
              >
                Income
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tx-date">Date</Label>
              <Input
                id="tx-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && (
                <p className="text-xs text-destructive">{errors.date}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tx-amount">Amount</Label>
              <Input
                id="tx-amount"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {errors.amount && (
                <p className="text-xs text-destructive">{errors.amount}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tx-desc">Description</Label>
            <Input
              id="tx-desc"
              placeholder="What was this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tx-notes">Notes (optional)</Label>
            <Textarea
              id="tx-notes"
              placeholder="Any extra details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{isEdit ? 'Save Changes' : 'Add Transaction'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
