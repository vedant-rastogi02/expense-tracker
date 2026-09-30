import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/TransactionServices.js";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const {
    data: transactions,
    isError,
    isLoading,
    isFetched,
    error,
    refetch,
  } = useQuery({
    queryFn: () => listTransactionsAPI({}),
    queryKey: ["list-transactions"],
  });
  const totalIncome = (transactions || []).reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction?.amount;
      } else {
        acc.expense += transaction?.amount;
      }
      return acc;
    },
    {
      income: 0,
      expense: 0,
    }
  );

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totalIncome.income, totalIncome.expense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWith: 1,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Income vs Expense",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  };
  return (
    <div className="glass-panel glass-surface my-6 rounded-[28px] p-4 text-white sm:p-6 lg:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Transaction Overview</h1>
          <p className="mt-1 text-sm text-white/65">A quick snapshot of income versus expense.</p>
        </div>
        {isLoading && <span className="text-sm text-white/60">Loading chart...</span>}
        {isError && <span className="text-sm text-rose-300">Unable to load chart data.</span>}
      </div>
      <div className="mt-6 h-65 sm:h-80 lg:h-90">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
