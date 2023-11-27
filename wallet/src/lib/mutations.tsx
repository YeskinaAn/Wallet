import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { privateCostsApi } from "./costsApi";
import { queryClient } from "./queryClient";
import { ExpensesType, IncomeType } from "../types/walletTypes";

export const useCreateExpense = (): UseMutationResult<ExpensesType> =>
  useMutation({
    mutationFn: (payload: unknown) => {
      return privateCostsApi
        .post<ExpensesType>(`/createExpenses`, payload)
        .then(({ data }) => data);
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [`/expenses`],
        }),
        queryClient.invalidateQueries({
          queryKey: [`/income`],
        }),
      ]),
  });

export const useDeleteExpense = () =>
  useMutation({
    mutationFn: (expenseId: number) => {
      return privateCostsApi
        .delete(`/deleteExpense/${expenseId}`)
        .then(({ data }) => data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [`/expenses`],
      }),
  });

export const useCreateIncome = (): UseMutationResult<IncomeType> =>
  useMutation({
    mutationFn: (payload: unknown) => {
      return privateCostsApi
        .post<IncomeType>(`/createIncome`, payload)
        .then(({ data }) => data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [`/income`],
      }),
  });

export const useDeleteIncome = () =>
  useMutation({
    mutationFn: (incomeId: number) => {
      return privateCostsApi
        .delete(`/deleteIncome/${incomeId}`)
        .then(({ data }) => data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [`/income`],
      }),
  });
