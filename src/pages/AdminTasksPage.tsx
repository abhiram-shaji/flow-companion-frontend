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
import { useManageTasks } from "../hooks/useManageTasks";
import Sidebar from "../components/AdminSidebar";
import { useTaskDialog } from "../hooks/useTaskDialog";

const AdminTasksPage: React.FC = () => {
  const {
    tasks,
    handleMarkCompleted,
    statusFilter,
    setStatusFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useManageTasks();
  const { open, taskData, setTaskData, openDialog, closeDialog } =
    useTaskDialog();

  const workers = ["John Doe", "Jane Smith", "Bob Brown"];

  const handleSave = () => {
    // Update task in the state or add a new one
    if (taskData.id === 0) {
      // Add new task
      tasks.push({ ...taskData, id: tasks.length + 1 });
    } else {
      // Update existing task
      tasks.map((task) =>
        task.id === taskData.id ? { ...task, ...taskData } : task
      );
    }
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
          Tasks Management
        </Typography>

        {/* Filters */}
        <Box sx={{ marginBottom: 3 }}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Tasks Table */}
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
                      onClick={() => openDialog(task)}
                      variant="contained"
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleMarkCompleted(task.id)}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Mark Completed
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Task Button */}
        <Button
          onClick={() => openDialog()}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Task
        </Button>

        {/* Add/Edit Task Dialog */}
        <Dialog open={open} onClose={closeDialog} fullWidth>
          <DialogTitle>
            {taskData.id === 0 ? "Add Task" : "Edit Task"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Task Name"
              fullWidth
              value={taskData.name}
              onChange={(e) =>
                setTaskData({ ...taskData, name: e.target.value })
              }
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

export default AdminTasksPage;
