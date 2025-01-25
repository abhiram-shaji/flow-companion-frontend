import axios from "axios";

export const fetchProjectBudgets = async (projectId: string) => {
  try {
    const response = await axios.get(
      `https://flow-companion-backend.onrender.com/api/budgets/project/${projectId}`
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(`Error fetching budgets for project ${projectId}:`, error);
    return [];
  }
};
