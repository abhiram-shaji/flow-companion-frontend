import { useState, useEffect } from "react";

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

const mockProjects: Project[] = [
  {
    projectId: 1,
    name: "New Building Project",
    budget: 50000,
    currentSpend: 0,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    budgets: [
      { budgetId: 1, projectId: 1, budgetLimit: 10000, currentSpend: 6000, remainingBudget: 4000 },
    ],
    estimates: [
      { estimateId: 1, projectId: 1, estimatedCost: 15000, deadline: "2025-01-31" },
    ],
  },
];

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Simulating an API call
    const fetchProjects = async () => {
      // Replace with actual API call if needed
      setProjects(mockProjects);
    };

    fetchProjects();
  }, []);

  return {
    projects,
  };
};

export default useProjects;
