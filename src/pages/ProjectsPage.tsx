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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project A",
      budget: 10000,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
    },
    {
      id: 2,
      name: "Project B",
      budget: 5000,
      startDate: "2023-06-01",
      endDate: "2023-11-30",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    id: 0,
    name: "",
    budget: "",
    startDate: "",
    endDate: "",
  });

  const handleOpen = (project?: typeof projectData) => {
    setProjectData(
      project
        ? { ...project, budget: project.budget.toString() }
        : { id: 0, name: "", budget: "", startDate: "", endDate: "" }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (projectData.id === 0) {
      // Add new project
      setProjects([
        ...projects,
        { ...projectData, id: projects.length + 1, budget: Number(projectData.budget) },
      ]);
    } else {
      // Update existing project
      setProjects(
        projects.map((p) => (p.id === projectData.id ? { ...projectData, budget: Number(projectData.budget) } : p))
      );
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Projects Management
      </Typography>

      {/* Table for displaying projects */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>${project.budget}</TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.endDate}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpen({ ...project, budget: project.budget.toString() })}
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(project.id)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Project Button */}
      <Button
        onClick={() => handleOpen()}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Add Project
      </Button>

      {/* Dialog for Add/Edit Project */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {projectData.id === 0 ? "Add Project" : "Edit Project"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            value={projectData.name}
            onChange={(e) =>
              setProjectData({ ...projectData, name: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Budget"
            type="number"
            fullWidth
            value={projectData.budget}
            onChange={(e) =>
              setProjectData({ ...projectData, budget: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={projectData.startDate}
            onChange={(e) =>
              setProjectData({ ...projectData, startDate: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={projectData.endDate}
            onChange={(e) =>
              setProjectData({ ...projectData, endDate: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectsPage;
