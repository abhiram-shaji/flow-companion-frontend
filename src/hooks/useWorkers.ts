// hooks/useWorkers.ts
import { useState } from "react";

interface Worker {
  id: number;
  name: string;
  email: string;
  password?: string;
  assignedProjects: string[];
}

const useWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      assignedProjects: ["Project A"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      assignedProjects: ["Project B"],
    },
  ]);

  const addWorker = (worker: Worker) => {
    setWorkers((prevWorkers) => [...prevWorkers, { ...worker, id: prevWorkers.length + 1 }]);
  };

  const updateWorker = (updatedWorker: Worker) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) => (worker.id === updatedWorker.id ? updatedWorker : worker))
    );
  };

  const deleteWorker = (id: number) => {
    setWorkers((prevWorkers) => prevWorkers.filter((worker) => worker.id !== id));
  };

  return { workers, addWorker, updateWorker, deleteWorker };
};

export default useWorkers;
