import axios from "axios";
import { Project } from "../types";

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await axios.get("https://flow-companion-backend.onrender.com/api/projects/get-all");
  return response.data.map((project: any) => ({
    id: project.projectId,
    name: project.name,
    budget: parseFloat(project.budget),
    currentSpend: parseFloat(project.currentSpend),
    startDate: project.startDate,
    endDate: project.endDate,
  }));
};
