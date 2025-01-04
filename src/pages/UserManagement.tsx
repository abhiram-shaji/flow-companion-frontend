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

const UserManagement: React.FC = () => {
  const [workers, setWorkers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", assignedProjects: ["Project A"] },
    { id: 2, name: "Jane Smith", email: "jane@example.com", assignedProjects: ["Project B"] },
  ]);

  const [open, setOpen] = useState(false);
  const [workerData, setWorkerData] = useState<{
    id: number;
    name: string;
    email: string;
    password?: string;
    assignedProjects: string[];
  }>({
    id: 0,
    name: "",
    email: "",
    password: "",
    assignedProjects: [],
  });
  

  const [projects, setProjects] = useState(["Project A", "Project B", "Project C"]);

  const handleOpen = (worker?: typeof workerData) => {
    setWorkerData(worker || { id: 0, name: "", email: "", password: "", assignedProjects: [] });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (workerData.id === 0) {
      // Add new worker
      setWorkers([...workers, { ...workerData, id: workers.length + 1 }]);
    } else {
      // Update existing worker
      setWorkers(workers.map((w) => (w.id === workerData.id ? workerData : w)));
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {/* Table for displaying workers */}
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
                  <Button onClick={() => handleOpen(worker)} variant="contained" size="small" sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(worker.id)}
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Delete
                  </Button>
                  <Button onClick={() => handleOpen(worker)} variant="contained" size="small">
                    Assign
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Worker Button */}
      <Button
        onClick={() => handleOpen()}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Add Worker
      </Button>

      {/* Dialog for Add/Edit Worker */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{workerData.id === 0 ? "Add Worker" : "Edit Worker"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={workerData.name}
            onChange={(e) => setWorkerData({ ...workerData, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={workerData.email}
            onChange={(e) => setWorkerData({ ...workerData, email: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={workerData.password}
            onChange={(e) => setWorkerData({ ...workerData, password: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Assign Projects</InputLabel>
            <Select
              multiple
              value={workerData.assignedProjects}
              onChange={(e) => setWorkerData({ ...workerData, assignedProjects: e.target.value as string[] })}
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
  );
};

export default UserManagement;
