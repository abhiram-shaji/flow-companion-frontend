import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useEstimates } from "../hooks/useEstimates";

const WorkerEstimatesPage: React.FC = () => {
  const estimates = useEstimates();

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
          Worker Estimates
        </Typography>

        {/* Estimates List */}
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          {estimates.map((estimate) => (
            <Grid item xs={12} sm={6} md={4} key={estimate.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{estimate.projectName}</Typography>
                  <Typography variant="body2">
                    <strong>Estimated Cost:</strong> ${estimate.cost}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Deadline:</strong> {estimate.deadline}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Text Section */}
        <Box>
          <Typography variant="body1">
            The estimates displayed above provide an overview of the projected
            costs and deadlines for your assigned projects. Ensure that tasks
            are completed within the estimated cost and timeline to align with
            project goals. For more details or adjustments, contact your project
            manager.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkerEstimatesPage;
