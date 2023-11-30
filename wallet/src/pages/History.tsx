import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useDeleteExpense, useDeleteIncome } from "../lib/mutations";
import Header from "../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate, showExpensesIcons } from "../utils/functions";
import { ExpensesType, IncomeType } from "../types/walletTypes";
import { useEffect, useRef, useState } from "react";

const History = (): JSX.Element => {
  const { data: expensesData }: any = useQuery<ExpensesType[]>({
    queryKey: [`/expenses`],
  });

  const { data: incomeData }: any = useQuery<IncomeType[]>({
    queryKey: [`/income`],
  });

  const deleteExpense = useDeleteExpense();
  const deleteIncome = useDeleteIncome();

  let valueByDate =
    expensesData &&
    incomeData &&
    [...expensesData, ...incomeData]?.reduce((acc: any, value) => {
      const formattedDate = formatDate(value.createdAt);
      const previousValue = acc[formattedDate];
      console.log({
        ...acc,
        [formattedDate]: previousValue ? [value, ...previousValue] : [value],
      });

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "0 auto",
            width: "670px",
            border: "4px solid #2b8aea",
            padding: 5,
            borderRadius: "20px",
          }}>
          <Typography
            variant="h1"
            sx={{ textAlign: "center", mb: 4, fontWeight: 600 }}>
            History
          </Typography>
          {valueByDate &&
            Object.entries(valueByDate)
              .reverse()
              .map(([key, value]: [string, any], idx: number) => {
                return (
                  <Box key={idx}>
                    <Typography
                      sx={{ fontSize: "28px", fontWeight: 600, my: 2 }}>
                      {key}
                    </Typography>
                    {value.map(
                      (res: ExpensesType & { incomeValue: number }) => (
                        <Box
                          mb={2}
                          sx={{
                            background: res?.incomeValue && "#86b9ec38",
                          }}
                          borderRadius="10px"
                          border="1px solid #2b8aea"
                          p={2.5}
                          display="flex"
                          key={res.id}>
                          <Box
                            display="flex"
                            width="100%"
                            justifyContent="space-between">
                            <Typography sx={{ fontSize: "26px" }}>
                              {res.expenseValue || res.incomeValue} ₴
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
                            onClick={() =>
                              res?.incomeValue
                                ? deleteIncome.mutate(res.id)
                                : deleteExpense.mutate(res.id)
                            }>
                            <DeleteIcon />
                          </Button>
                        </Box>
                      )
                    )}
                  </Box>
                );
              })}
        </Box>
      </Box>
    </>
  );
};

export default History;
