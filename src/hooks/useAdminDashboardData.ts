import { useState } from "react";

export const useAdminDashboardData = () => {
  const [tasks] = useState([
    {
      id: 1,
      name: "Design Homepage",
      assignedTo: "John Doe",
      status: "In Progress",
    },
  ]);

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

  return { tasks, budgets, estimates };
};
