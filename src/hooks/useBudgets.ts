import { useState } from "react";

export const useBudgets = () => {
  const [budgets] = useState([
    {
      id: 1,
      projectName: "Project A",
      currentSpending: 6000,
      remainingBudget: 4000,
    },
    {
      id: 2,
      projectName: "Project B",
      currentSpending: 12000,
      remainingBudget: 8000,
    },
  ]);
  return budgets;
};
