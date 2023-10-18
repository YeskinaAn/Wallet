import { useMutation } from "@tanstack/react-query";
import { privateCostsApi } from "./costsApi";
import { queryClient } from "./queryClient";

export const useCreateExpense = () =>
  useMutation({
    mutationFn: (payload) => {
      return privateCostsApi
        .post(`/createExpenses`, payload)
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
    mutationFn: (expenseId) => {
      return privateCostsApi
        .delete(`/deleteExpense/${expenseId}`)
        .then(({ data }) => data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [`/expenses`],
      }),
  });

export const useCreateIncome = () =>
  useMutation({
    mutationFn: (payload) => {
      return privateCostsApi
        .post(`/createIncome`, payload)
        .then(({ data }) => data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [`/income`],
      }),
  });

export const useDeleteIncome = () =>
  useMutation({
    mutationFn: (incomeId) => {
      return privateCostsApi
        .delete(`/deleteIncome/${incomeId}`)
        .then(({ data }) => data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [`/income`],
      }),
  });
