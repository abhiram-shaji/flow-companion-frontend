import { useState, useEffect } from "react";
import axios from "axios";

interface Project {
  id: string;
  name: string;
  budget: number;
  currentSpend: number;
  startDate: string;
  endDate: string;
}

interface Budget {
  id: string;
  projectName: string;
  totalBudget: number;
  remainingBudget: number;
}

interface Estimate {
  id: string;
  projectName: string;
  estimatedCost: number;
  deadline: string;
}

interface Task {
  id: string;
  projectName: string;
  taskName: string;
  assignedTo: string;
  dueDate: string;
}

const useAdminDashboardData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [projectsResponse, budgetsResponse, estimatesResponse, tasksResponse] = await Promise.all([
          axios.get("https://flow-companion-backend.onrender.com/api/projects/get-all"),
          axios.get("https://flow-companion-backend.onrender.com/api/budgets/get-all"),
          axios.get("https://flow-companion-backend.onrender.com/api/estimates/get-all"),
          axios.get("https://flow-companion-backend.onrender.com/api/tasks/get-all"),
        ]);

        const projectsData = projectsResponse.data.map((project: any) => ({
          id: project.projectId,
          name: project.name,
          budget: parseFloat(project.budget),
          currentSpend: parseFloat(project.currentSpend),
          startDate: project.startDate,
          endDate: project.endDate,
        }));

        const budgetsData = budgetsResponse.data.map((budget: any) => {
          const project = projectsData.find((p: Project) => p.id === budget.projectId);
          return {
            id: budget.budgetId,
            projectName: project ? project.name : `Project ${budget.projectId}`,
            totalBudget: parseFloat(budget.budgetLimit) || 0,
            remainingBudget: parseFloat(budget.remainingBudget) || 0,
          };
        });
        
        const estimatesData = estimatesResponse.data.map((estimate: any) => {
          const project = projectsData.find((p: Project) => p.id === estimate.projectId);
          return {
            id: estimate.estimateId,
            projectName: project ? project.name : `Project ${estimate.projectId}`,
            estimatedCost: parseFloat(estimate.estimatedCost) || 0,
            deadline: estimate.deadline,
          };
        });
        
        const tasksData = tasksResponse.data.map((task: any) => {
          const project = projectsData.find((p: Project) => p.id === task.projectId);
          return {
            id: task.taskId,
            projectName: project ? project.name : `Project ${task.projectId}`,
            taskName: task.taskName,
            assignedTo: task.assignedTo,
            dueDate: task.dueDate,
          };
        });        

        setProjects(projectsData);
        setBudgets(budgetsData);
        setEstimates(estimatesData);
        setTasks(tasksData);

        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { projects, budgets, estimates, tasks, loading, error };
};

export default useAdminDashboardData;
