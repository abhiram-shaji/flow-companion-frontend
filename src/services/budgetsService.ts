import axios from "axios";
import { Budget, Project } from "../types";

export const fetchBudgets = async (projectsData: Project[]): Promise<Budget[]> => {
  const response = await axios.get("https://flow-companion-backend.onrender.com/api/budgets/get-all");
  return response.data.map((budget: any) => {
    const project = projectsData.find((p: Project) => p.id === budget.projectId);
    return {
      id: budget.budgetId,
      projectName: project ? project.name : `Project ${budget.projectId}`,
      totalBudget: parseFloat(budget.budgetLimit) || 0,
      remainingBudget: parseFloat(budget.remainingBudget) || 0,
    };
  });
};
