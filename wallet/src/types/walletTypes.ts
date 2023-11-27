export interface IncomeType {
  id: number;
  user: User;
  userId: number;
  createdAt: string;
  incomeValue: number;
  category: string;
}

export interface ExpensesType {
  id: number;
  user: User[];
  userId: number;
  createdAt: string;
  expenseValue: number;
  category: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  income: IncomeType[];
  expenses: ExpensesType[];
}
