import { useState } from "react";

export const useEstimates = () => {
  const [estimates] = useState([
    {
      id: 1,
      projectName: "Project A",
      cost: 15000,
      deadline: "2023-12-31",
    },
    {
      id: 2,
      projectName: "Project B",
      cost: 20000,
      deadline: "2024-06-30",
    },
  ]);
  return estimates;
};
