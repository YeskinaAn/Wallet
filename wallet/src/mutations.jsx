import { useMutation } from "@tanstack/react-query";
import { privateCostsApi } from "./lib/costsApi";
import { queryClient } from "./lib/queryClient";

export const useCreateExpense = () =>
  useMutation({
    mutationFn: (payload) => {
      return privateCostsApi
        .post(`/expenses`, payload)
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
      return privateCostsApi.post(`/income`, payload).then(({ data }) => data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [`/income`],
      }),
  });
