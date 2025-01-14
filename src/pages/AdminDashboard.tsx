import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { useAdminDashboardData } from "../hooks/useAdminDashboardData";
import Sidebar from "../components/AdminSidebar";

const AdminDashboard: React.FC = () => {
  const { budgets, estimates } = useAdminDashboardData();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: { sm: 250 }, // Matches the width of the sidebar on desktop
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1, // Takes up remaining width
          padding: 2, // Adds padding around the content
        }}
      >
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>

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
                      <strong>Remaining Budget:</strong> $
                      {budget.remainingBudget}
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
