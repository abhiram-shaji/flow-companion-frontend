import { useMemo } from "react";

export const useChartData = (budgets: any[]) => {
  return useMemo(() => ({
    labels: budgets.map((b) => b.projectName),
    datasets: [
      {
        label: "Budget Usage",
        data: budgets.map((b) => b.currentSpending),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  }), [budgets]);
};
