import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useDeleteExpense } from "../lib/mutations";
import Menu from "../components/Menu";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDate = (date) => {
  let objectDate = new Date(date);
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();

  return day + "/" + month + "/" + year;
};

const Expenses = () => {
  const { data: expensesData } = useQuery({
    queryKey: [`/expenses`],
  });
  const deleteExpense = useDeleteExpense();
  const data = expensesData?.reduce((acc, value) => {
    const formattedDate = formatDate(value.createdAt);
    const previousValue = acc[formattedDate];

    return {
      ...acc,
      [formattedDate]: previousValue ? [...previousValue, value] : [value],
    };
  }, {});
  console.log(data);
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
          {expensesData?.map((res) => (
            <Box display="flex" key={res.id}>
              <Typography>{res.category}</Typography>
              <Typography>{res.expenseValue}</Typography>
              <Button onClick={() => deleteExpense.mutate(res.id)}>
                <DeleteIcon />
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Expenses;
