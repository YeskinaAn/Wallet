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
import { expenseCategories, incomeCategories } from "../helpers/constants";
import { useState } from "react";
import { useCreateExpense } from "../mutations";
import { useCreateIncome } from "../mutations";

const Costs = () => {
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeValue, setIncomeValue] = useState("");
  const incomeMutation = useCreateIncome();
  const expenseMutation = useCreateExpense();
  const history = useHistory();

  const handleExpenseCategoryChange = (event) => {
    setExpenseCategory(event.target.value);
  };

  const handleOkExpenseChange = () => {
    expenseMutation.mutate({
      category: expenseCategory,
      expenseValue: Number(expenseValue),
    });
  };

  const handleExpenseChange = (event) => {
    setExpenseValue(event.target.value);
  };

   const handleIncomeCategoryChange = (event) => {
     setIncomeCategory(event.target.value);
   };

   const handleOkIncomeChange = () => {
     incomeMutation.mutate({
       category: incomeCategory,
       incomeValue: Number(incomeValue),
     });
   };

   const handleIncomeChange = (event) => {
     setIncomeValue(event.target.value);
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
        }}
      >
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
                onChange={handleExpenseCategoryChange}
              >
                {expenseCategories.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              sx={{ width: "100px" }}
              value={expenseValue}
              onChange={handleExpenseChange}
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
                onChange={handleIncomeCategoryChange}
              >
                {incomeCategories.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              sx={{ width: "100px" }}
              value={incomeValue}
              onChange={handleIncomeChange}
            />
            <Button onClick={handleOkIncomeChange}>Ok</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Costs;
