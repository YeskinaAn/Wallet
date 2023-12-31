import { Request, Response } from "express";
import { prisma } from "../server";

interface CustomRequest extends Request {
  userId: number;
  category: string;
}

const getExpenses = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { category } = req.query;

  let expensesQuery: any = {
    where: {
      userId,
    },
  };

  if (category) {
    expensesQuery.where.category = category.toString();
  }

  const myExpenses = await prisma.expenses.findMany(expensesQuery);
  res.json(myExpenses);
};

const createExpenses = async (req: CustomRequest, res: Response) => {
  const { expenseValue, category } = req.body;
  const userId = req.userId;

  const expenses = await prisma.expenses.create({
    data: {
      expenseValue,
      category,
      user: { connect: { id: userId } },
    },
  });

  res.json(expenses);
};

const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id, category, expenseValue } = req.body;
    const updatedExpense = await prisma.expenses.update({
      where: {
        id: id,
      },
      data: {
        category,
        expenseValue,
      },
    });
    res.status(200).json(updatedExpense);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedExpense = await prisma.expenses.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.status(200).json(deletedExpense);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

const getIncome = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { category } = req.query;

  let incomeQuery: any = {
    where: {
      userId,
    },
  };

  if (category) {
    incomeQuery.where.category = category.toString();
  }

  const myIncome = await prisma.income.findMany(incomeQuery);
  res.json(myIncome);
};

const createIncome = async (req: CustomRequest, res: Response) => {
  const { incomeValue, category } = req.body;
  const userId = req.userId;

  const income = await prisma.income.create({
    data: {
      incomeValue,
      category,
      user: { connect: { id: userId } },
    },
  });
  res.json(income);
};

const deleteIncome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedInsome = await prisma.income.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.status(200).json(deletedInsome);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  getExpenses,
  createExpenses,
  updateExpense,
  deleteExpense,
  getIncome,
  createIncome,
  deleteIncome,
};
