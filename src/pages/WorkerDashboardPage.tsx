import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { useTasks } from "../hooks/useTasks";
import { useBudgets } from "../hooks/useBudgets";
import { useEstimates } from "../hooks/useEstimates";

const WorkerDashboardPage: React.FC = () => {
  const tasks = useTasks();
  const budgets = useBudgets();
  const estimates = useEstimates();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Worker Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Assigned Tasks */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assigned Tasks
              </Typography>
              {tasks.map((task) => (
                <Box key={task.id} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    <strong>Task:</strong> {task.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Due Date:</strong> {task.dueDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {task.status}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Budget Details */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Budget Details
              </Typography>
              {budgets.map((budget) => (
                <Box key={budget.id} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    <strong>Project:</strong> {budget.projectName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Current Spending:</strong> ${budget.currentSpending}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Remaining Budget:</strong> ${budget.remainingBudget}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Estimate Details */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estimate Details
              </Typography>
              {estimates.map((estimate) => (
                <Box key={estimate.id} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    <strong>Project:</strong> {estimate.projectName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Estimated Cost:</strong> ${estimate.cost}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Deadline:</strong> {estimate.deadline}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkerDashboardPage;
