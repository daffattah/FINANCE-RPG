export type TransactionType = 'income' | 'expense';

export type PaymentMethod = 'Cash' | 'Debit Card' | 'Credit Card' | 'E-Wallet' | 'Bank Transfer' | 'Other';

export type Transaction = {
  id: string;
  user_id: string;
  date: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  payment_method: PaymentMethod;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type TransactionInput = {
  date: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  payment_method: PaymentMethod;
  notes?: string | null;
};

export const incomeCategories = [
  'Pocket Money',
  'Gift',
  'Side Income',
  'Other',
] as const;

export const expenseCategories = [
  'Food',
  'Jajan/Snack',
  'Transportation',
  'School',
  'Entertainment',
  'Personal',
  'Other',
] as const;

export const paymentMethods: PaymentMethod[] = [
  'Cash',
  'Debit Card',
  'Credit Card',
  'E-Wallet',
  'Bank Transfer',
  'Other',
];

export function categoriesForType(type: TransactionType): readonly string[] {
  return type === 'income' ? incomeCategories : expenseCategories;
}
