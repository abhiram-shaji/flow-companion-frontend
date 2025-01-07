import { useState } from "react";

interface Project {
  id: number;
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
}

export const useManageProjects = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Project A",
      budget: 10000,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
    },
    {
      id: 2,
      name: "Project B",
      budget: 5000,
      startDate: "2023-06-01",
      endDate: "2023-11-30",
    },
  ]);

  const addOrUpdateProject = (project: Project) => {
    if (project.id === 0) {
      // Add new project
      setProjects((prev) => [
        ...prev,
        { ...project, id: prev.length + 1, budget: Number(project.budget) },
      ]);
    } else {
      // Update existing project
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...project } : p))
      );
    }
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return { projects, addOrUpdateProject, deleteProject };
};
