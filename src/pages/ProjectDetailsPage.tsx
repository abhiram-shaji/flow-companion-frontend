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

const ProjectDetailsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [project, setProject] = useState({
    id: 1,
    name: "Project A",
    budget: 10000,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  });
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", assignedTo: "John Doe", status: "In Progress" },
    { id: 2, name: "Task 2", assignedTo: "Jane Smith", status: "Completed" },
  ]);
  const [estimates, setEstimates] = useState([
    { id: 1, cost: 5000, deadline: "2023-06-30" },
    { id: 2, cost: 3000, deadline: "2023-09-15" },
  ]);
  const [openEdit, setOpenEdit] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleEditSave = () => {
    // Update project logic here
    setOpenEdit(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Project Details: {project.name}
      </Typography>

      {/* Tabs for Sections */}
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ marginBottom: 3 }}>
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
            onClick={handleEditOpen}
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
      <Dialog open={openEdit} onClose={handleEditClose} fullWidth>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Budget"
            type="number"
            fullWidth
            value={project.budget}
            onChange={(e) =>
              setProject({ ...project, budget: Number(e.target.value) })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={project.startDate}
            onChange={(e) =>
              setProject({ ...project, startDate: e.target.value })
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
              setProject({ ...project, endDate: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectDetailsPage;
