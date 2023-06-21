import { QueryClient } from "@tanstack/react-query";
import { privateCostsApi } from "./costsApi";

const defaultQueryFunction = ({ queryKey: [url, data] }) => {
  return privateCostsApi.get(url, { params: data }).then(({ data }) => data);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFunction,
      refetchOnWindowFocus: false,
    },
  },
});
