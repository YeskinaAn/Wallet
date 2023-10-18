import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { expenseCategories, incomeCategories } from "../utils/constants";
import { useState } from "react";
import {
  useCreateExpense,
  useDeleteExpense,
  useDeleteIncome,
} from "../lib/mutations";
import { useCreateIncome } from "../lib/mutations";

const Costs = () => {
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeValue, setIncomeValue] = useState("");
  const incomeMutation = useCreateIncome();
  const expenseMutation = useCreateExpense();
  const deleteExpense = useDeleteExpense();
  const deleteIncome = useDeleteIncome();
  const history = useHistory();

  const handleOkExpenseChange = () => {
    expenseMutation.mutate({
      category: expenseCategory,
      expenseValue: Number(expenseValue),
    });
    setExpenseCategory("");
    setExpenseValue("");
  };

  const handleOkIncomeChange = () => {
    incomeMutation.mutate({
      category: incomeCategory,
      incomeValue: Number(incomeValue),
    });
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  const { data: expensesData } = useQuery({
    queryKey: [`/expenses`],
  });

  const { data: incomeData } = useQuery({
    queryKey: [`/income`],
  });

  console.log(expensesData, incomeData);
  return (
    <>
      <Button onClick={logout}>Log out</Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 5,
        }}>
        <Typography variant="h2">My costs</Typography>
        <Box display="flex" m={2}>
          <Typography>Base wallet:</Typography>
          <Typography>0</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex">
            <Typography>My expenses</Typography>
            <FormControl sx={{ minWidth: "120px", mx: 2 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={expenseCategory}
                onChange={(event) => setExpenseCategory(event.target.value)}>
                {expenseCategories.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              sx={{ width: "100px" }}
              value={expenseValue}
              onChange={(event) => setExpenseValue(event.target.value)}
            />
            <Button onClick={handleOkExpenseChange}>Ok</Button>
          </Box>

          <Box display="flex">
            <Typography>My income</Typography>
            <FormControl sx={{ minWidth: "120px", mx: 2 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={incomeCategory}
                onChange={(event) => setIncomeCategory(event.target.value)}>
                {incomeCategories.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              sx={{ width: "100px" }}
              value={incomeValue}
              onChange={(event) => setIncomeValue(event.target.value)}
            />
            <Button onClick={handleOkIncomeChange}>Ok</Button>
          </Box>
        </Box>
        <Box>
          {expensesData?.map((res, i) => {
            return (
              <Box display="flex" key={i}>
                <Typography>{res.category}</Typography>
                <Typography>{res.expenseValue}</Typography>
                <Button onClick={() => deleteExpense.mutate(res.id)}>
                  Delete
                </Button>
              </Box>
            );
          })}
        </Box>
        <Box>
          {incomeData?.map((res, i) => {
            return (
              <Box display="flex" key={i}>
                <Typography>{res.category}</Typography>
                <Typography>{res.incomeValue}</Typography>
                <Button onClick={() => deleteIncome.mutate(res.id)}>
                  Delete
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default Costs;
