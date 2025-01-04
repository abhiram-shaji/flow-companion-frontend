import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminBudgetsPage: React.FC = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      projectName: "Project A",
      totalBudget: 10000,
      currentSpending: 6000,
      notes: "Initial phase completed",
    },
    {
      id: 2,
      projectName: "Project B",
      totalBudget: 20000,
      currentSpending: 12000,
      notes: "Testing in progress",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [budgetData, setBudgetData] = useState({
    id: 0,
    projectName: "",
    totalBudget: "",
    currentSpending: "",
    notes: "",
  });

  const handleOpen = (budget?: typeof budgetData) => {
    setBudgetData(
      budget || {
        id: 0,
        projectName: "",
        totalBudget: "",
        currentSpending: "",
        notes: "",
      }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (budgetData.id === 0) {
      // Add new budget
      setBudgets([
        ...budgets,
        {
          ...budgetData,
          id: budgets.length + 1,
          totalBudget: Number(budgetData.totalBudget),
          currentSpending: Number(budgetData.currentSpending),
        },
      ]);
    } else {
      // Update existing budget
      setBudgets(
        budgets.map((budget) =>
          budget.id === budgetData.id
            ? {
                ...budgetData,
                totalBudget: Number(budgetData.totalBudget),
                currentSpending: Number(budgetData.currentSpending),
              }
            : budget
        )
      );
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  const chartData = {
    labels: budgets.map((b) => b.projectName),
    datasets: [
      {
        label: "Budget Utilization",
        data: budgets.map((b) => b.currentSpending),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Budget Management
      </Typography>

      {/* Budget Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Total Budget</TableCell>
              <TableCell>Current Spending</TableCell>
              <TableCell>Remaining Budget</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell>{budget.projectName}</TableCell>
                <TableCell>${budget.totalBudget}</TableCell>
                <TableCell>${budget.currentSpending}</TableCell>
                <TableCell>
                  ${budget.totalBudget - budget.currentSpending}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpen({ ...budget, totalBudget: budget.totalBudget.toString(), currentSpending: budget.currentSpending.toString() })}
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(budget.id)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Budget Button */}
      <Button
        onClick={() => handleOpen()}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Add Budget
      </Button>

      {/* Pie Chart */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Budget Utilization Chart
        </Typography>
        <Pie data={chartData} />
      </Box>

      {/* Add/Edit Budget Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {budgetData.id === 0 ? "Add Budget" : "Edit Budget"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            value={budgetData.projectName}
            onChange={(e) =>
              setBudgetData({ ...budgetData, projectName: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Total Budget"
            type="number"
            fullWidth
            value={budgetData.totalBudget}
            onChange={(e) =>
              setBudgetData({ ...budgetData, totalBudget: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Current Spending"
            type="number"
            fullWidth
            value={budgetData.currentSpending}
            onChange={(e) =>
              setBudgetData({
                ...budgetData,
                currentSpending: e.target.value,
              })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Notes"
            fullWidth
            value={budgetData.notes}
            onChange={(e) =>
              setBudgetData({ ...budgetData, notes: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminBudgetsPage;
