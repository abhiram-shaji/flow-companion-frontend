import { useState } from "react";

export const useTasks = () => {
  const [tasks] = useState([
    {
      id: 1,
      name: "Task A",
      dueDate: "2023-12-01",
      status: "Pending",
      assignedTo: "John Doe", // Added
      description: "Initial setup of the project.", // Added
    },
    {
      id: 2,
      name: "Task B",
      dueDate: "2023-12-15",
      status: "In Progress",
      assignedTo: "Jane Smith", // Added
      description: "Drafting project documentation.", // Added
    },
  ]);
  return tasks;
};
