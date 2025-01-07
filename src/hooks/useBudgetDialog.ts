import { useState } from "react";

export const useBudgetDialog = () => {
  const [open, setOpen] = useState(false);
  const [budgetData, setBudgetData] = useState({
    id: 0,
    projectName: "",
    totalBudget: "",
    currentSpending: "",
    notes: "",
  });

  const openDialog = (budget?: typeof budgetData) => {
    setBudgetData(
      budget || {
        id: 0,
        projectName: "",
        totalBudget: "",
        currentSpending: "",
        notes: "",
      }
    );
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  return { open, budgetData, setBudgetData, openDialog, closeDialog };
};
