export interface Project {
    id: string;
    name: string;
    budget: number;
    currentSpend: number;
    startDate: string;
    endDate: string;
  }
  
  export interface Budget {
    id: string;
    projectName: string;
    totalBudget: number;
    remainingBudget: number;
  }
  
  export interface Estimate {
    id: string;
    projectName: string;
    estimatedCost: number;
    deadline: string;
  }
  
  export interface Task {
    id: string;
    projectName: string;
    taskName: string;
    assignedTo: string;
    dueDate: string;
  }
  