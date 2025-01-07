import { useState } from "react";

export const useTaskDialog = () => {
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    id: 0,
    name: "",
    dueDate: "",
    description: "",
    assignedTo: "",
    status: "Pending",
  });

  const openDialog = (task?: typeof taskData) => {
    setTaskData(
      task || {
        id: 0,
        name: "",
        dueDate: "",
        description: "",
        assignedTo: "",
        status: "Pending",
      }
    );
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  return { open, taskData, setTaskData, openDialog, closeDialog };
};
