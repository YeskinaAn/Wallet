import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import ExpenseChart from "../components/ExpenseChart";
import IncomeChart from "../components/IncomeChart";
import ExpensesSelect from "../components/ExpensesSelect";
import IncomeSelect from "../components/IncomeSelect";

const Costs = () => {
  const { data: incomeData } = useQuery({
    queryKey: [`/income`],
  });

  const { data: expensesData } = useQuery({
    queryKey: [`/expenses`],
  });

  const incomeSummary = incomeData?.reduce(
    (acc, curr) => acc + curr.incomeValue,
    0
  );

  const expenseSummary = expensesData?.reduce(
    (acc, curr) => acc + curr.expenseValue,
    0
  );
  // const deleteIncome = useDeleteIncome();
  return (
    <>
      <Header />
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
              <Typography ml={2}>{incomeSummary}₴</Typography>
            </Box>
            <Box gap={2} display="flex" flexDirection="column">
              <ExpensesSelect />
              <IncomeSelect />
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
            {/* <Box>
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
          <Box width="100%" borderBottom="2px solid #2b8aea">
            <ExpenseChart />
          </Box>
          <IncomeChart />
        </Box>
      </Box>
    </>
  );
};

export default Costs;
