import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Chart } from "react-google-charts";
import { IncomeType } from "../types/walletTypes";

const IncomeChart = (): JSX.Element => {
  const { data: incomeData } = useQuery<IncomeType[]>({
    queryKey: [`/income`],
  });
  const combinedCategories: { [key: string]: number } = {};

  incomeData
    ?.map((el) => [el.category, el.incomeValue])
    .forEach((entry) => {
      const category = entry[0];
      const incomeValue = entry[1];

      if (category in combinedCategories) {
        combinedCategories[category] += Number(incomeValue);
      } else {
        combinedCategories[category] = Number(incomeValue);
      }
    });

  const options = {
    title: "",
  };
  const chartData = Object.entries(combinedCategories);

  return (
    <>
      <Typography sx={{ textAlign: "center", mt: 3 }} variant="h2">
        My income
      </Typography>
      <Chart
        chartType="PieChart"
        data={[["Income", "per month"], ...chartData]}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </>
  );
};
export default IncomeChart;
