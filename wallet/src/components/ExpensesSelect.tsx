import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCreateExpense } from "../lib/mutations";
import { showExpensesIcons } from "../utils/functions";
import { expenseCategories } from '../utils/constants';

const ExpensesSelect = (): JSX.Element => {
  const [expenseCategory, setExpenseCategory] = useState<string>("");
  const [expenseValue, setExpenseValue] = useState<string>("");
  const expenseMutation = useCreateExpense();

  const handleOkExpenseChange = (): void => {
    expenseMutation.mutate({
      category: expenseCategory,
      expenseValue: Number(expenseValue),
    });
    setExpenseCategory("");
    setExpenseValue("");
  };
  return (
    <Box gap={3} display="flex">
      <Typography sx={{ minWidth: "170px", fontWeight: 600, fontSize: "22px" }}>
        Select expenses
      </Typography>
      <Box gap={2}>
        <FormControl sx={{ minWidth: "170px", mx: 2 }}>
          <Select
            sx={{ display: "flex" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={expenseCategory}
            onChange={(event) => setExpenseCategory(event.target.value)}>
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
  );
};

export default ExpensesSelect;
