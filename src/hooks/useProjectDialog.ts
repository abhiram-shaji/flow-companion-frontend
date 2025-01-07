import { useState } from "react";

export const useProjectDialog = () => {
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    id: 0,
    name: "",
    budget: "",
    startDate: "",
    endDate: "",
  });

  const openDialog = (project?: typeof projectData) => {
    setProjectData(
      project
        ? { ...project, budget: project.budget.toString() }
        : { id: 0, name: "", budget: "", startDate: "", endDate: "" }
    );
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  return { open, projectData, setProjectData, openDialog, closeDialog };
};
