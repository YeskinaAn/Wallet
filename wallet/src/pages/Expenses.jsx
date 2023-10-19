import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useDeleteExpense } from "../lib/mutations";
import Menu from "../components/Menu";

const Expenses = () => {
  const { data: expensesData } = useQuery({
    queryKey: [`/expenses`],
  });
  const deleteExpense = useDeleteExpense();

  return (
    <>
      <Menu />
      <Box>
        {expensesData?.map((res) => (
          <Box display="flex" key={res.id}>
            <Typography>{res.category}</Typography>
            <Typography>{res.expenseValue}</Typography>
            <Button onClick={() => deleteExpense.mutate(res.id)}>Delete</Button>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Expenses;
