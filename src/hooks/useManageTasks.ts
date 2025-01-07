import { useState, useMemo } from "react";
import { useTasks } from "./useTasks";

export const useManageTasks = () => {
  const tasks = useTasks(); // Fetch tasks from the existing useTasks hook

  const [statusFilter, setStatusFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [updatedTasks, setUpdatedTasks] = useState(tasks);

  const handleMarkCompleted = (id: number) => {
    setUpdatedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    return updatedTasks.filter((task) => {
      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      const matchesDateRange =
        (!startDate || new Date(task.dueDate) >= new Date(startDate)) &&
        (!endDate || new Date(task.dueDate) <= new Date(endDate));
      return matchesStatus && matchesDateRange;
    });
  }, [updatedTasks, statusFilter, startDate, endDate]);

  return {
    tasks: filteredTasks,
    handleMarkCompleted,
    statusFilter,
    setStatusFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
};
