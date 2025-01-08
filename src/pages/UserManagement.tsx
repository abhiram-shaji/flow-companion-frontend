// components/UserManagement.tsx
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Sidebar from "../components/AdminSidebar";
import useWorkers from "../hooks/useWorkers";

const UserManagement: React.FC = () => {
  const { workers, addWorker, updateWorker, deleteWorker } = useWorkers();
  const [open, setOpen] = useState(false);
  const [workerData, setWorkerData] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    assignedProjects: [] as string[],
  });

  const [projects] = useState(["Project A", "Project B", "Project C"]);

  const handleOpen = (worker?: typeof workerData) => {
    setWorkerData(
      worker || {
        id: 0,
        name: "",
        email: "",
        password: "",
        assignedProjects: [],
      }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (workerData.id === 0) {
      addWorker(workerData);
    } else {
      updateWorker(workerData);
    }
    handleClose();
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
          User Management
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Assigned Projects</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>{worker.name}</TableCell>
                  <TableCell>{worker.email}</TableCell>
                  <TableCell>{worker.assignedProjects.join(", ")}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleOpen({ ...worker, password: worker.password || "" })}
                      variant="contained"
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteWorker(worker.id)}
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={() => handleOpen()}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Worker
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>
            {workerData.id === 0 ? "Add Worker" : "Edit Worker"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={workerData.name}
              onChange={(e) =>
                setWorkerData({ ...workerData, name: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              value={workerData.email}
              onChange={(e) =>
                setWorkerData({ ...workerData, email: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={workerData.password}
              onChange={(e) =>
                setWorkerData({ ...workerData, password: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Assign Projects</InputLabel>
              <Select
                multiple
                value={workerData.assignedProjects}
                onChange={(e) =>
                  setWorkerData({
                    ...workerData,
                    assignedProjects: e.target.value as string[],
                  })
                }
              >
                {projects.map((project) => (
                  <MenuItem key={project} value={project}>
                    {project}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UserManagement;
