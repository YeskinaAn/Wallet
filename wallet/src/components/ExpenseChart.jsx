import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";

const ExpenseChart = () => {
  const { data: expensesData } = useQuery({
    queryKey: [`/expenses`],
  });
  const combinedCategories = {};

  expensesData
    ?.map((el) => [el.category, el.expenseValue])
    .forEach((entry) => {
      const category = entry[0];
      const expenseValue = entry[1];

      if (category in combinedCategories) {
        combinedCategories[category] += expenseValue;
      } else {
        combinedCategories[category] = expenseValue;
      }
    });

  const options = {
    title: "My Expenses",
  };
  const chartData = Object.entries(combinedCategories);

  return (
    <Chart
      chartType="PieChart"
      data={[["Expenses", "per month"], ...chartData]}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};
export default ExpenseChart;