import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";

const IncomeChart = () => {
  const { data: incomeData } = useQuery({
    queryKey: [`/income`],
  });
  const combinedCategories = {};

  incomeData
    ?.map((el) => [el.category, el.incomeValue])
    .forEach((entry) => {
      const category = entry[0];
      const incomeValue = entry[1];

      if (category in combinedCategories) {
        combinedCategories[category] += incomeValue;
      } else {
        combinedCategories[category] = incomeValue;
      }
    });

  const options = {
    title: "My Income",
  };
  const chartData = Object.entries(combinedCategories);

  return (
    <Chart
      chartType="PieChart"
      data={[["Income", "per month"], ...chartData]}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};
export default IncomeChart;