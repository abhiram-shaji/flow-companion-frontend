import { useState } from "react";

export const useEstimateDialog = () => {
  const [open, setOpen] = useState(false);
  const [estimateData, setEstimateData] = useState({
    id: 0,
    projectName: "",
    cost: "",
    deadline: "",
    description: "",
  });

  const openDialog = (estimate?: typeof estimateData) => {
    setEstimateData(
      estimate || {
        id: 0,
        projectName: "",
        cost: "",
        deadline: "",
        description: "",
      }
    );
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  return { open, estimateData, setEstimateData, openDialog, closeDialog };
};
