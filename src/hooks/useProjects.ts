import { useState, useEffect } from "react";
import axios from "axios";

export interface Budget {
  budgetId: number;
  projectId: number;
  budgetLimit: number;
  currentSpend: number;
  remainingBudget: number;
}

export interface Estimate {
  estimateId: number;
  projectId: number;
  estimatedCost: number;
  deadline: string;
}

export interface Project {
  projectId: number;
  name: string;
  budget: number;
  currentSpend: number;
  startDate: string;
  endDate: string;
  budgets: Budget[];
  estimates: Estimate[];
}

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        // Fetch all projects
        const projectResponse = await axios.get(
          "https://flow-companion-backend.onrender.com/api/projects/get-all"
        );
        const projectsData = projectResponse.data;

        // Fetch budgets and estimates for each project
        const projectsWithDetails = await Promise.all(
          projectsData.map(async (project: Omit<Project, "budgets" | "estimates">) => {
            try {
              const [budgetsResponse, estimatesResponse] = await Promise.all([
                axios
                  .get(`https://flow-companion-backend.onrender.com/api/budgets/project/${project.projectId}`)
                  .then((res) => (Array.isArray(res.data) ? res.data : []))
                  .catch(() => []), // Fallback to empty array if API fails
                axios
                  .get(`https://flow-companion-backend.onrender.com/api/estimates/project/${project.projectId}`)
                  .then((res) => (Array.isArray(res.data) ? res.data : []))
                  .catch(() => []), // Fallback to empty array if API fails
              ]);

              return {
                ...project,
                budgets: budgetsResponse,
                estimates: estimatesResponse,
              };
            } catch (innerErr) {
              console.error(`Error fetching budgets/estimates for project ${project.projectId}:`, innerErr);
              return {
                ...project,
                budgets: [],
                estimates: [],
              };
            }
          })
        );

        setProjects(projectsWithDetails);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch project data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export default useProjects;
