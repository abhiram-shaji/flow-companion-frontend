import React, { useState } from "react";
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
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Sidebar from "../components/Sidebar";
import useProjects from "../hooks/useProjects";
import AddProjectModal from "../components/AddProjectModal";

const ProjectOverview: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const [expanded, setExpanded] = useState<number | false>(false); // Manage which accordion is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccordionChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAddProject = (newProject: {
    name: string;
    budget: number;
    startDate: string;
    endDate: string;
  }) => {
    // Add logic to send new project to the backend or update state
    console.log("New Project:", newProject);
    // Example: You can use an API call to save the project and refresh the list
  };

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
          padding: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Project Overview
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2 }}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Project
        </Button>

        <AddProjectModal
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={(newProject) => {
    handleAddProject(newProject); // Handle the project addition logic here
  }}
/>



        {/* Loading State */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Projects List */}
        {!loading &&
          !error &&
          projects.map((project) => (
            <Accordion
              key={project.projectId}
              expanded={expanded === project.projectId}
              onChange={handleAccordionChange(project.projectId)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{project.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Project Details */}
                <Card variant="outlined" sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography>
                      <strong>Start Date:</strong> {project.startDate}
                    </Typography>
                    <Typography>
                      <strong>End Date:</strong> {project.endDate}
                    </Typography>
                    <Typography>
                      <strong>Total Budget:</strong> ${project.budget}
                    </Typography>
                    <Typography>
                      <strong>Current Spend:</strong> ${project.currentSpend}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Budgets Table */}
                <Typography variant="subtitle1">
                  <strong>Budgets:</strong>
                </Typography>
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
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  <strong>Estimates:</strong>
                </Typography>
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
