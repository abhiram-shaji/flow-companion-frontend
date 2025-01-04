import React from "react";
import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";

const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Recent Tasks Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Tasks</Typography>
              <Typography variant="body2">Task Name: Design Homepage</Typography>
              <Typography variant="body2">Assigned To: John Doe</Typography>
              <Typography variant="body2">Status: In Progress</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Budget Overview Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Budget Overview</Typography>
              <Typography variant="body2">Project Name: Marketing Campaign</Typography>
              <Typography variant="body2">Total Budget: $50,000</Typography>
              <Typography variant="body2">Remaining Budget: $20,000</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Estimate Summary Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Estimate Summary</Typography>
              <Typography variant="body2">Project Name: App Development</Typography>
              <Typography variant="body2">Estimated Cost: $10,000</Typography>
              <Typography variant="body2">Deadline: Dec 31, 2025</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Navigation Links */}
      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Manage Tasks
        </Button>
        <Button variant="contained" color="secondary" sx={{ marginRight: 2 }}>
          Manage Budgets
        </Button>
        <Button variant="contained" color="primary">
          Manage Estimates
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
