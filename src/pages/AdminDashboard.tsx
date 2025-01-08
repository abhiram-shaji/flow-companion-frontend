import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { useAdminDashboardData } from "../hooks/useAdminDashboardData";
import Sidebar from "../components/AdminSidebar";

const AdminDashboard: React.FC = () => {
  const { tasks, budgets, estimates } = useAdminDashboardData();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Recent Tasks Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Recent Tasks</Typography>
                {tasks.map((task) => (
                  <Box key={task.id} sx={{ marginBottom: 1 }}>
                    <Typography variant="body2">
                      <strong>Task Name:</strong> {task.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Assigned To:</strong> {task.assignedTo}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Status:</strong> {task.status}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Budget Overview Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Budget Overview</Typography>
                {budgets.map((budget) => (
                  <Box key={budget.id} sx={{ marginBottom: 1 }}>
                    <Typography variant="body2">
                      <strong>Project Name:</strong> {budget.projectName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Total Budget:</strong> ${budget.totalBudget}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Remaining Budget:</strong> ${budget.remainingBudget}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Estimate Summary Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Estimate Summary</Typography>
                {estimates.map((estimate) => (
                  <Box key={estimate.id} sx={{ marginBottom: 1 }}>
                    <Typography variant="body2">
                      <strong>Project Name:</strong> {estimate.projectName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Estimated Cost:</strong> ${estimate.estimatedCost}
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
    </Box>
  );
};

export default AdminDashboard;
