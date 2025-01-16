import { useState, useEffect } from "react";
import axios from "axios";

interface Task {
  taskId: number;
  projectId: number;
  taskName: string;
  assignedTo: number;
  dueDate: string;
  status: string;
}

interface TaskResponse {
  message: string;
  taskId?: number;
}

const useTaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Task[]>("https://flow-companion-backend.onrender.com/api/tasks/get-all");
      setTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (
    projectId: number, // Include projectId
    taskName: string,
    assignedTo: number,
    dueDate: string,
    status: string
  ) => {
    try {
      setLoading(true);
  
      // Log data being sent to the server for debugging
      console.log("Sending task to server:", {
        projectId,
        taskName,
        assignedTo,
        dueDate,
        status,
      });
  
      const response = await axios.post<TaskResponse>(
        "https://flow-companion-backend.onrender.com/api/tasks/",
        {
          projectId, // Include projectId in the payload
          taskName,
          assignedTo,
          dueDate,
          status,
        }
      );
  
      // Log the server response for debugging
      console.log("Response from server:", response.data);
  
      // Add the new task to the current task list
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          taskId: response.data.taskId!,
          taskName,
          assignedTo,
          dueDate,
          status,
          projectId,
        },
      ]);
    } catch (err: any) {
      // Log the error details for debugging
      console.error("Error adding task:", err.response || err.message);
  
      // Update the error state with a descriptive message
      setError(err.response?.data?.message || "Failed to add task.");
    } finally {
      setLoading(false);
    }
  };
  

  // Edit an existing task
  const editTask = async (
    taskId: number,
    taskName: string,
    assignedTo: number,
    dueDate: string,
    status: string
  ) => {
    try {
      setLoading(true);
      await axios.put<TaskResponse>(`https://flow-companion-backend.onrender.com/api/tasks/${taskId}`, {
        taskName,
        assignedTo,
        dueDate,
        status,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.taskId === taskId
            ? { ...task, taskName, assignedTo, dueDate, status }
            : task
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to edit task.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId: number) => {
    try {
      setLoading(true);
      await axios.delete<TaskResponse>(`https://flow-companion-backend.onrender.com/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete task.");
    } finally {
      setLoading(false);
    }
  };

  // Mark a task as complete
  const markTaskAsComplete = async (taskId: number) => {
    try {
      setLoading(true);
      await editTask(taskId, "", 0, "", "Complete"); // Only status is updated
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to mark task as complete.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, addTask, editTask, deleteTask, markTaskAsComplete, loading, error };
};

export default useTaskManagement;
