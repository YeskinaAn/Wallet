import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import { ExpensesType } from "../types/walletTypes";

const ExpenseChart = (): JSX.Element => {
  const { data: expensesData } = useQuery<ExpensesType[]>({
    queryKey: [`/expenses`],
  });

  const expenseSummary = expensesData?.reduce(
    (acc, curr) => acc + curr.expenseValue,
    0
  );

  const combinedCategories: { [key: string]: number } = {};

  expensesData
    ?.map((el: ExpensesType) => [el.category, el.expenseValue])
    .forEach((entry) => {
      const category = entry[0];
      const expenseValue = entry[1];

      if (category in combinedCategories) {
        combinedCategories[category] += Number(expenseValue);
      } else {
        combinedCategories[category] = Number(expenseValue);
      }
    });

  const options = {
    title: "",
  };
  const chartData = Object.entries(combinedCategories);

  return (
    <>
      <Typography sx={{ textAlign: "center", mt: 3 }} variant="h2">
        My expenses: {expenseSummary}₴
      </Typography>
      <Chart
        chartType="PieChart"
        data={[["ExpensesType", "per month"], ...chartData]}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </>
  );
};
export default ExpenseChart;
