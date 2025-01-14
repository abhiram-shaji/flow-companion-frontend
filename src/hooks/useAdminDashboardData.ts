import { useState } from "react";

export const useAdminDashboardData = () => {

  const [budgets] = useState([
    {
      id: 1,
      projectName: "Marketing Campaign",
      totalBudget: 50000,
      remainingBudget: 20000,
    },
  ]);

  const [estimates] = useState([
    {
      id: 1,
      projectName: "App Development",
      estimatedCost: 10000,
      deadline: "2025-12-31",
    },
  ]);

  return { budgets, estimates };
};


/*Implement these api here instead of dummy data

host : https://flow-companion-backend.onrender.com



*/