import { useState } from "react";
import { useBudgets } from "./useBudgets";

export const useManageBudgets = () => {
  const budgetsFromHook = useBudgets();
  const [budgets, setBudgets] = useState(budgetsFromHook);

  const addOrUpdateBudget = (budget: any) => {
    if (budget.id === 0) {
      // Add new budget
      setBudgets((prev) => [
        ...prev,
        {
          ...budget,
          id: prev.length + 1,
          totalBudget: Number(budget.totalBudget),
          currentSpending: Number(budget.currentSpending),
          remainingBudget:
            Number(budget.totalBudget) - Number(budget.currentSpending),
        },
      ]);
    } else {
      // Update existing budget
      setBudgets((prev) =>
        prev.map((b) =>
          b.id === budget.id
            ? {
                ...budget,
                totalBudget: Number(budget.totalBudget),
                currentSpending: Number(budget.currentSpending),
                remainingBudget:
                  Number(budget.totalBudget) - Number(budget.currentSpending),
              }
            : b
        )
      );
    }
  };

  const deleteBudget = (id: number) => {
    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  };

  return { budgets, addOrUpdateBudget, deleteBudget };
};
