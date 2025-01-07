import { useState } from "react";

export const useTasks = () => {
  const [tasks] = useState([
    { id: 1, name: "Task A", dueDate: "2023-12-01", status: "In Progress" },
    { id: 2, name: "Task B", dueDate: "2023-12-15", status: "Pending" },
  ]);
  return tasks;
};
