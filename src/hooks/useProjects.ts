
import { useState, useEffect } from "react";
import { fetchProjects } from "../services/projectsService";
import { fetchProjectBudgets } from "../services/projectBudgetsService";
import { fetchProjectEstimates } from "../services/projectEstimatesService";
import { Project } from "../types";

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsWithDetails = async () => {
      try {
        setLoading(true);

        // Fetch all projects
        const projectsData = await fetchProjects();

        // Fetch budgets and estimates for each project
        const projectsWithDetails = await Promise.all(
          projectsData.map(async (project) => {
            try {
              const [budgets, estimates] = await Promise.all([
                fetchProjectBudgets(project.id),
                fetchProjectEstimates(project.id),
              ]);

              return {
                ...project,
                budgets,
                estimates,
              };
            } catch (innerErr) {
              console.error(`Error fetching budgets/estimates for project ${project.id}:`, innerErr);
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

    fetchProjectsWithDetails();
  }, []);

  return { projects, loading, error };
};

export default useProjects;