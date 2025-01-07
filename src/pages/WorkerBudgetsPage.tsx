import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useBudgets } from "../hooks/useBudgets";
import { useChartData } from "../hooks/useChartData";

ChartJS.register(ArcElement, Tooltip, Legend);

const WorkerBudgetsPage: React.FC = () => {
  const budgets = useBudgets();
  const chartData = useChartData(budgets);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Worker Budgets
      </Typography>

      {/* Budget List */}
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        {budgets.map((budget) => (
          <Grid item xs={12} sm={6} md={4} key={budget.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{budget.projectName}</Typography>
                <Typography variant="body2">
                  <strong>Total Budget:</strong> ${budget.totalBudget}
                </Typography>
                <Typography variant="body2">
                  <strong>Current Spending:</strong> ${budget.currentSpending}
                </Typography>
                <Typography variant="body2">
                  <strong>Remaining Budget:</strong> ${budget.remainingBudget}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pie Chart */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Budget Utilization Chart
        </Typography>
        <Pie data={chartData} />
      </Box>

      {/* Text Section */}
      <Box>
        <Typography variant="body1">
          The budget details above show your project's financial usage. Please
          ensure that tasks are completed within the allocated budget to avoid
          overspending. Contact your project manager if you need further
          clarification on the budgets or allocations.
        </Typography>
      </Box>
    </Box>
  );
};

export default WorkerBudgetsPage;
