import { useState, useEffect } from "react";
import { fetchProjects } from "../services/projectsService";
import { fetchBudgets } from "../services/budgetsService";
import { fetchEstimates } from "../services/estimatesService";
import { fetchTasks } from "../services/tasksService";
import { Project, Budget, Estimate, Task } from "../types";

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

        const projectsData = await fetchProjects();
        const budgetsData = await fetchBudgets(projectsData);
        const estimatesData = await fetchEstimates(projectsData);
        const tasksData = await fetchTasks(projectsData);

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
