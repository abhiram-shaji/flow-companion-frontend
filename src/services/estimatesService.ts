import axios from "axios";
import { Estimate, Project } from "../types";

export const fetchEstimates = async (projectsData: Project[]): Promise<Estimate[]> => {
  const response = await axios.get("https://flow-companion-backend.onrender.com/api/estimates/get-all");
  return response.data.map((estimate: any) => {
    const project = projectsData.find((p: Project) => p.id === estimate.projectId);
    return {
      id: estimate.estimateId,
      projectName: project ? project.name : `Project ${estimate.projectId}`,
      estimatedCost: parseFloat(estimate.estimatedCost) || 0,
      deadline: estimate.deadline,
    };
  });
};
