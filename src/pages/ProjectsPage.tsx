import React from "react";
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
import { useManageProjects } from "../hooks/useManageProjects";
import Sidebar from "../components/Sidebar";
import { useProjectDialog } from "../hooks/useProjectDialog";

const ProjectsPage: React.FC = () => {
  const { projects, addOrUpdateProject, deleteProject } = useManageProjects();
  const { open, projectData, setProjectData, openDialog, closeDialog } =
    useProjectDialog();

  const handleSave = () => {
    addOrUpdateProject({
      ...projectData,
      budget: Number(projectData.budget),
    });
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
                      onClick={() =>
                        openDialog({
                          ...project,
                          budget: project.budget.toString(),
                        })
                      }
                      variant="contained"
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteProject(project.id)}
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
          onClick={() => openDialog()}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Project
        </Button>

        {/* Dialog for Add/Edit Project */}
        <Dialog open={open} onClose={closeDialog} fullWidth>
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
            <Button onClick={closeDialog}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>{" "}
    </Box>
  );
};

export default ProjectsPage;
