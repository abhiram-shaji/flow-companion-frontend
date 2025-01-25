import axios from "axios";

const BASE_URL = "https://flow-companion-backend.onrender.com/api/budgets";

/**
 * Updates a budget by its ID.
 *
 * @param budgetId - The ID of the budget to update.
 * @param data - An object containing the updated budget details.
 * @returns A promise that resolves with a success message or rejects with an error.
 */
export const updateProjectBudget = async (
  budgetId: number,
  data: { budgetLimit: number; currentSpend: number }
): Promise<{ message: string }> => {
  try {
    const response = await axios.put(`${BASE_URL}/${budgetId}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating project budget with ID ${budgetId}:`, error);
    throw error;
  }
};
