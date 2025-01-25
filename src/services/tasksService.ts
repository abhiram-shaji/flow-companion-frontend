import axios from "axios";
import { Task, Project } from "../types";

export const fetchTasks = async (projectsData: Project[]): Promise<Task[]> => {
  const response = await axios.get("https://flow-companion-backend.onrender.com/api/tasks/get-all");
  return response.data.map((task: any) => {
    const project = projectsData.find((p: Project) => p.id === task.projectId);
    return {
      id: task.taskId,
      projectName: project ? project.name : `Project ${task.projectId}`,
      taskName: task.taskName,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
    };
  });
};
