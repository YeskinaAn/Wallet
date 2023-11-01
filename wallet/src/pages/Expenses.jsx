import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useDeleteExpense } from "../lib/mutations";
import Header from "../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate, showExpensesIcons } from "../utils/functions";

const Expenses = () => {
  const { data: expensesData } = useQuery({
    queryKey: [`/expenses`],
  });

  const deleteExpense = useDeleteExpense();

  const expensesByDate = expensesData?.reduce((acc, value) => {
    const formattedDate = formatDate(value.createdAt);
    const previousValue = acc[formattedDate];
    return {
      ...acc,
      [formattedDate]: previousValue ? [value, ...previousValue] : [value],
    };
  }, {});

  return (
    <>
      <Header />
      <Box
        sx={{
          m: "120px 80px 80px 80px",
        }}>
        <Typography
          variant="h1"
          sx={{ textAlign: "center", mb: 4, fontWeight: 600 }}>
          Expenses history
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "0 auto",
            width: "fit-content",
            border: "4px solid #2b8aea",
            padding: 5,
            borderRadius: "20px",
          }}>
          {expensesByDate &&
            Object.entries(expensesByDate)
              .reverse()
              .map(([key, value], idx) => (
                <Box key={idx}>
                  <Typography sx={{ fontSize: "28px", fontWeight: 600, my: 2 }}>
                    {key}
                  </Typography>
                  {value.map((res) => (
                    <Box
                      mb={2}
                      borderRadius="10px"
                      border="1px solid #2b8aea"
                      p={2.5}
                      width="450px"
                      display="flex"
                      key={res.id}>
                      <Box
                        display="flex"
                        width="100%"
                        justifyContent="space-between">
                        <Typography sx={{ fontSize: "26px" }}>
                          {res.expenseValue} ₴
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Typography
                            sx={{
                              fontSize: "24px",
                            }}>
                            {res.category}
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ml: 0.5,
                            }}>
                            {showExpensesIcons(res.category)}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        sx={{
                          color: "common.red",
                          border: "1px solid red",
                          ml: 2,
                        }}
                        onClick={() => deleteExpense.mutate(res.id)}>
                        <DeleteIcon />
                      </Button>
                    </Box>
                  ))}
                </Box>
              ))}
        </Box>
      </Box>
    </>
  );
};

export default Expenses;
