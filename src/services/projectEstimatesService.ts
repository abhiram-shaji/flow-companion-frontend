import axios from "axios";

export const fetchProjectEstimates = async (projectId: string) => {
  try {
    const response = await axios.get(
      `https://flow-companion-backend.onrender.com/api/estimates/project/${projectId}`
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(`Error fetching estimates for project ${projectId}:`, error);
    return [];
  }
};
