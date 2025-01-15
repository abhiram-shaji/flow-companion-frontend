import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useProjectDetails } from "../hooks/useProjectDetails";
import Sidebar from "../components/Sidebar";
import { useDialog } from "../hooks/useDialog";

const ProjectDetailsPage: React.FC = () => {
  const { project, tasks, estimates, updateProject } = useProjectDetails();
  const { open, openDialog, closeDialog } = useDialog();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSaveProject = (updatedProject: typeof project) => {
    updateProject(updatedProject);
    closeDialog();
  };

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
          Project Details: {project.name}
        </Typography>

        {/* Tabs for Sections */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ marginBottom: 3 }}
        >
          <Tab label="Overview" />
          <Tab label="Tasks" />
          <Tab label="Estimates" />
        </Tabs>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {project.name}
            </Typography>
            <Typography variant="body1">
              <strong>Budget:</strong> ${project.budget}
            </Typography>
            <Typography variant="body1">
              <strong>Start Date:</strong> {project.startDate}
            </Typography>
            <Typography variant="body1">
              <strong>End Date:</strong> {project.endDate}
            </Typography>
            <Button
              onClick={openDialog}
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Edit Project
            </Button>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Tasks
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Task Name</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>{task.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Add Task
            </Button>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Estimates
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cost</TableCell>
                    <TableCell>Deadline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {estimates.map((estimate) => (
                    <TableRow key={estimate.id}>
                      <TableCell>${estimate.cost}</TableCell>
                      <TableCell>{estimate.deadline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Add Estimate
            </Button>
          </Box>
        )}

        {/* Edit Project Dialog */}
        <Dialog open={open} onClose={closeDialog} fullWidth>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogContent>
            <TextField
              label="Project Name"
              fullWidth
              value={project.name}
              onChange={(e) =>
                updateProject({ ...project, name: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Budget"
              type="number"
              fullWidth
              value={project.budget}
              onChange={(e) =>
                updateProject({ ...project, budget: Number(e.target.value) })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={project.startDate}
              onChange={(e) =>
                updateProject({ ...project, startDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={project.endDate}
              onChange={(e) =>
                updateProject({ ...project, endDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button
              onClick={() => handleSaveProject(project)}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>{" "}
    </Box>
  );
};

export default ProjectDetailsPage;
