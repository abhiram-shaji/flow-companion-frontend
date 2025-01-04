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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const AdminTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Task A",
      assignedTo: "John Doe",
      dueDate: "2023-12-01",
      status: "Pending",
      description: "Initial setup of the project.",
    },
    {
      id: 2,
      name: "Task B",
      assignedTo: "Jane Smith",
      dueDate: "2023-12-15",
      status: "In Progress",
      description: "Drafting project documentation.",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    id: 0,
    name: "",
    dueDate: "",
    description: "",
    assignedTo: "",
    status: "Pending",
  });

  const [workers] = useState(["John Doe", "Jane Smith", "Bob Brown"]);

  const handleOpen = (task?: typeof taskData) => {
    setTaskData(
      task || {
        id: 0,
        name: "",
        dueDate: "",
        description: "",
        assignedTo: "",
        status: "Pending",
      }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (taskData.id === 0) {
      // Add new task
      setTasks([...tasks, { ...taskData, id: tasks.length + 1 }]);
    } else {
      // Update existing task
      setTasks(
        tasks.map((task) => (task.id === taskData.id ? taskData : task))
      );
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tasks Management
      </Typography>

      {/* Table for displaying tasks */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpen(task)}
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(task.id)}
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleOpen(task)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Assign
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Task Button */}
      <Button
        onClick={() => handleOpen()}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Add Task
      </Button>

      {/* Dialog for Add/Edit Task */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {taskData.id === 0 ? "Add Task" : "Edit Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            fullWidth
            value={taskData.name}
            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            value={taskData.dueDate}
            onChange={(e) =>
              setTaskData({ ...taskData, dueDate: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Assign To</InputLabel>
            <Select
              value={taskData.assignedTo}
              onChange={(e) =>
                setTaskData({ ...taskData, assignedTo: e.target.value })
              }
            >
              {workers.map((worker) => (
                <MenuItem key={worker} value={worker}>
                  {worker}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={taskData.status}
              onChange={(e) =>
                setTaskData({ ...taskData, status: e.target.value })
              }
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
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

export default AdminTasksPage;
