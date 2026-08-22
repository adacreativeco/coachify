import { describe, it, expect } from 'vitest';

describe('Club Financial Ledger & Liquidity Engine', () => {
  interface Transaction {
    type: 'income' | 'expense';
    amount: number;
  }

  const transactions: Transaction[] = [
    { type: 'income', amount: 8500000 },
    { type: 'income', amount: 3200000 },
    { type: 'expense', amount: 4800000 },
    { type: 'expense', amount: 450000 },
  ];

  it('computes total income, expense and net cash flow', () => {
    const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const net = income - expense;

    expect(income).toBe(11700000);
    expect(expense).toBe(5250000);
    expect(net).toBe(6450000);
  });
});
