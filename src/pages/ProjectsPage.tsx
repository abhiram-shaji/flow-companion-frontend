import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Sidebar from "../components/Sidebar";

const projects = [
  {
    projectId: 1,
    name: "New Building Project",
    budget: 50000,
    currentSpend: 0,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    budgets: [
      { budgetId: 1, projectId: 1, budgetLimit: 10000, currentSpend: 6000, remainingBudget: 4000 },
    ],
    estimates: [
      { estimateId: 1, projectId: 1, estimatedCost: 15000, deadline: "2025-01-31" },
    ],
  },
];

const ProjectOverview: React.FC = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: { sm: 250 }, // Matches the width of the sidebar
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
          Project Overview
        </Typography>
        {projects.map((project) => (
          <Accordion key={project.projectId}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{project.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Project Details */}
              <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography><strong>Start Date:</strong> {project.startDate}</Typography>
                  <Typography><strong>End Date:</strong> {project.endDate}</Typography>
                  <Typography><strong>Total Budget:</strong> ${project.budget}</Typography>
                  <Typography><strong>Current Spend:</strong> ${project.currentSpend}</Typography>
                </CardContent>
              </Card>

              {/* Budgets Table */}
              <Typography variant="subtitle1"><strong>Budgets:</strong></Typography>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Budget ID</TableCell>
                      <TableCell>Budget Limit</TableCell>
                      <TableCell>Current Spend</TableCell>
                      <TableCell>Remaining Budget</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {project.budgets.map((budget) => (
                      <TableRow key={budget.budgetId}>
                        <TableCell>{budget.budgetId}</TableCell>
                        <TableCell>${budget.budgetLimit}</TableCell>
                        <TableCell>${budget.currentSpend}</TableCell>
                        <TableCell>${budget.remainingBudget}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Estimates Table */}
              <Typography variant="subtitle1" sx={{ marginTop: 2 }}><strong>Estimates:</strong></Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Estimate ID</TableCell>
                      <TableCell>Estimated Cost</TableCell>
                      <TableCell>Deadline</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {project.estimates.map((estimate) => (
                      <TableRow key={estimate.estimateId}>
                        <TableCell>{estimate.estimateId}</TableCell>
                        <TableCell>${estimate.estimatedCost}</TableCell>
                        <TableCell>{estimate.deadline}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectOverview;
