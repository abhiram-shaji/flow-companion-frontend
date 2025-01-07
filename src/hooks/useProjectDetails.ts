import { useState } from "react";

interface Project {
  id: number;
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
}

interface Task {
  id: number;
  name: string;
  assignedTo: string;
  status: string;
}

interface Estimate {
  id: number;
  cost: number;
  deadline: string;
}

export const useProjectDetails = () => {
  const [project, setProject] = useState<Project>({
    id: 1,
    name: "Project A",
    budget: 10000,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  });

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Task 1", assignedTo: "John Doe", status: "In Progress" },
    { id: 2, name: "Task 2", assignedTo: "Jane Smith", status: "Completed" },
  ]);

  const [estimates, setEstimates] = useState<Estimate[]>([
    { id: 1, cost: 5000, deadline: "2023-06-30" },
    { id: 2, cost: 3000, deadline: "2023-09-15" },
  ]);

  const updateProject = (updatedProject: Project) => {
    setProject(updatedProject);
  };

  return {
    project,
    tasks,
    estimates,
    updateProject,
    setTasks,
    setEstimates,
  };
};
