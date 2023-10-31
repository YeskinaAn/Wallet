import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { expenseCategories, incomeCategories } from "../utils/constants";
import { useState } from "react";
import { useCreateExpense, useDeleteIncome } from "../lib/mutations";
import { useCreateIncome } from "../lib/mutations";
import Menu from "../components/Menu";
import ExpenseChart from "../components/ExpenseChart";
import { showExpensesIcons, showIncomeIcons } from "../utils/functions";

const Costs = () => {
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeValue, setIncomeValue] = useState("");
  const incomeMutation = useCreateIncome();
  const expenseMutation = useCreateExpense();

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

  const { data: incomeData } = useQuery({
    queryKey: [`/income`],
  });

  const { data: expensesData } = useQuery({
    queryKey: [`/expenses`],
  });

  const incomeSummary = incomeData?.map((item) => item.incomeValue);
  const expenseSummary = expensesData?.reduce(
    (acc, curr) => acc + curr.expenseValue,
    0
  );
  // const deleteIncome = useDeleteIncome();
  return (
    <>
      <Menu />
      <Box
        sx={{
          m: "120px 80px 80px 80px",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            width: "fit-content",
            border: "4px solid #2b8aea",
            padding: 5,
            borderRadius: "20px",
          }}>
          <Box
            display="flex"
            pb={4}
            sx={{ borderBottom: "2px solid #2b8aea" }}
            flexDirection="column"
            alignItems="center">
            <Typography variant="h2">My costs</Typography>
            <Box display="flex" m={3}>
              <Typography>Base wallet:</Typography>
              <Typography ml={2}>{incomeSummary}</Typography>
            </Box>
            <Box gap={2} display="flex" flexDirection="column">
              <Box gap={3} display="flex">
                <Typography
                  sx={{ minWidth: "170px", fontWeight: 600, fontSize: "22px" }}>
                  Select expenses
                </Typography>
                <Box gap={2}>
                  <FormControl sx={{ minWidth: "170px", mx: 2 }}>
                    <Select
                      sx={{ display: "flex" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={expenseCategory}
                      onChange={(event) =>
                        setExpenseCategory(event.target.value)
                      }>
                      {expenseCategories.map((el, i) => (
                        <MenuItem key={i} value={el}>
                          {el} {showExpensesIcons(el)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100px" }}
                    value={expenseValue}
                    placeholder="₴"
                    onChange={(event) => setExpenseValue(event.target.value)}
                  />
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOkExpenseChange}>
                  Add expense
                </Button>
              </Box>
              <Box gap={3} display="flex">
                <Typography
                  sx={{ minWidth: "170px", fontWeight: 600, fontSize: "22px" }}>
                  Select income
                </Typography>
                <Box gap={2}>
                  <FormControl sx={{ minWidth: "170px", mx: 2 }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={incomeCategory}
                      onChange={(event) =>
                        setIncomeCategory(event.target.value)
                      }>
                      {incomeCategories.map((el, i) => (
                        <MenuItem key={i} value={el}>
                          {el} {showIncomeIcons(el)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100px" }}
                    placeholder="₴"
                    value={incomeValue}
                    onChange={(event) => setIncomeValue(event.target.value)}
                  />
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOkIncomeChange}>
                  Add income
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            py={4}
            gap={2}
            width="100%"
            flexDirection="column"
            borderBottom="2px solid #2b8aea"
            alignItems="flex-start">
            <Box display="flex" gap={2}>
              <Typography
                sx={{ minWidth: "170px", fontWeight: 600, fontSize: "22px" }}>
                My expenses summary:
              </Typography>
              <Typography sx={{ fontSize: "24px" }}>
                {expenseSummary}₴
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Typography
                sx={{ minWidth: "170px", fontWeight: 600, fontSize: "22px" }}>
                My income summary:
              </Typography>
              <Typography sx={{ fontSize: "24px" }}>
                {incomeSummary}₴
              </Typography>
            </Box>
            {/* 
            <Box>
              {incomeData?.map((res) => (
                <Box display="flex" key={res.id}>
                  <Typography>{res.category}</Typography>
                  <Typography>{res.incomeValue}</Typography>
                  <Button onClick={() => deleteIncome.mutate(res.id)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </Box> */}
          </Box>
          <ExpenseChart />
        </Box>
      </Box>
    </>
  );
};

export default Costs;
