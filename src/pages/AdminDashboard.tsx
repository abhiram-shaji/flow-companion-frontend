import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import useAdminDashboardData from "../hooks/useAdminDashboardData";
import Sidebar from "../components/Sidebar";

const AdminDashboard: React.FC = () => {
  const { projects, budgets, estimates, tasks, loading, error } =
    useAdminDashboardData();

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: "center", marginTop: 4 }}>
        Error: {error.message}
      </Typography>
    );
  }

  const totalBudget = budgets.reduce((sum, b) => sum + (b.totalBudget || 0), 0);
  const totalRemainingBudget = budgets.reduce(
    (sum, b) => sum + (b.remainingBudget || 0),
    0
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: { sm: 250 },
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          padding: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Total Projects */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Projects</Typography>
                <Typography variant="h4">{projects.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Budget */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Budget</Typography>
                <Typography variant="h4">
                  ${totalBudget.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Remaining Budget */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Remaining Budget</Typography>
                <Typography variant="h4">
                  ${totalRemainingBudget.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Tasks */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Tasks</Typography>
                <Typography variant="h4">{tasks.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Budgets Overview */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Budgets Overview
            </Typography>
            <Grid container spacing={2}>
              {budgets.map((budget) => (
                <Grid item xs={12} sm={6} md={4} key={budget.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {budget.projectName || "Unnamed Project"}
                      </Typography>
                      <Typography>
                        Total Budget: ${budget.totalBudget?.toLocaleString() || "N/A"}
                      </Typography>
                      <Typography>
                        Remaining: ${budget.remainingBudget?.toLocaleString() || "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Estimates Overview */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Estimates Overview
            </Typography>
            <Grid container spacing={2}>
              {estimates.map((estimate) => (
                <Grid item xs={12} sm={6} md={4} key={estimate.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {estimate.projectName || "Unnamed Project"}
                      </Typography>
                      <Typography>
                        Estimated Cost: ${estimate.estimatedCost?.toLocaleString() || "N/A"}
                      </Typography>
                      <Typography>
                        Deadline: {new Date(estimate.deadline).toLocaleDateString("en-GB")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
