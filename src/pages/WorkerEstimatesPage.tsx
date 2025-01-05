import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const WorkerEstimatesPage: React.FC = () => {
  const estimates = [
    {
      id: 1,
      projectName: "Project A",
      estimatedCost: 15000,
      deadline: "2023-12-31",
    },
    {
      id: 2,
      projectName: "Project B",
      estimatedCost: 20000,
      deadline: "2024-06-30",
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
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
                  <strong>Estimated Cost:</strong> ${estimate.estimatedCost}
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
          costs and deadlines for your assigned projects. Ensure that tasks are
          completed within the estimated cost and timeline to align with project
          goals. For more details or adjustments, contact your project manager.
        </Typography>
      </Box>
    </Box>
  );
};

export default WorkerEstimatesPage;
