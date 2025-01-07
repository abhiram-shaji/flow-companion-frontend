import { useState } from "react";

export const useManageEstimates = () => {
  const [estimates, setEstimates] = useState([
    {
      id: 1,
      projectName: "Project A",
      cost: 15000,
      deadline: "2023-12-31",
      description: "Initial project estimate.",
    },
    {
      id: 2,
      projectName: "Project B",
      cost: 20000,
      deadline: "2024-06-30",
      description: "Extended phase estimate.",
    },
  ]);

  const addOrUpdateEstimate = (estimate: any) => {
    if (estimate.id === 0) {
      // Add new estimate
      setEstimates((prev) => [
        ...prev,
        {
          ...estimate,
          id: prev.length + 1,
          cost: Number(estimate.cost),
        },
      ]);
    } else {
      // Update existing estimate
      setEstimates((prev) =>
        prev.map((e) =>
          e.id === estimate.id
            ? { ...estimate, cost: Number(estimate.cost) }
            : e
        )
      );
    }
  };

  const deleteEstimate = (id: number) => {
    setEstimates((prev) => prev.filter((estimate) => estimate.id !== id));
  };

  return { estimates, addOrUpdateEstimate, deleteEstimate };
};
