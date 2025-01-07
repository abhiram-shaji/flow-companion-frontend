import React from "react";
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
import { useManageBudgets } from "../hooks/useManageBudgets";
import { useChartData } from "../hooks/useChartData";
import { useBudgetDialog } from "../hooks/useBudgetDialog";

const AdminBudgetsPage: React.FC = () => {
  const { budgets, addOrUpdateBudget, deleteBudget } = useManageBudgets();
  const chartData = useChartData(budgets);
  const { open, budgetData, setBudgetData, openDialog, closeDialog } =
    useBudgetDialog();

  const handleSave = () => {
    addOrUpdateBudget(budgetData);
    closeDialog();
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
                <TableCell>${budget.remainingBudget}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      openDialog({
                        ...budget,
                        totalBudget: budget.totalBudget.toString(),
                        currentSpending: budget.currentSpending.toString(),
                        notes: ""
                      })
                    }
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteBudget(budget.id)}
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
        onClick={() => openDialog()}
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
      <Dialog open={open} onClose={closeDialog} fullWidth>
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
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminBudgetsPage;
