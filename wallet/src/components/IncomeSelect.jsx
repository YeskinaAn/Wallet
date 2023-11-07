import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useCreateIncome } from "../lib/mutations";
import { showIncomeIcons } from '../utils/functions';
import { incomeCategories } from "../utils/constants";

const IncomeSelect = () => {
     const [incomeCategory, setIncomeCategory] = useState("");
     const [incomeValue, setIncomeValue] = useState("");
     const incomeMutation = useCreateIncome();

     const handleOkIncomeChange = () => {
       incomeMutation.mutate({
         category: incomeCategory,
         incomeValue: Number(incomeValue),
       });
       setIncomeCategory("");
       setIncomeValue("");
     };
    return (
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
              onChange={(event) => setIncomeCategory(event.target.value)}>
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
    );
}

export default IncomeSelect