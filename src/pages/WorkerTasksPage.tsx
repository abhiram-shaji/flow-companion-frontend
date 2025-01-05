import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";

interface Task {
  id: number;
  name: string;
  dueDate: string;
  status: string;
}

const WorkerTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Task A", dueDate: "2023-12-01", status: "In Progress" },
    { id: 2, name: "Task B", dueDate: "2023-12-15", status: "Pending" },
    { id: 3, name: "Task C", dueDate: "2023-12-20", status: "Completed" },
  ]);

  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleMarkCompleted = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesDateRange =
      (!startDate || new Date(task.dueDate) >= new Date(startDate)) &&
      (!endDate || new Date(task.dueDate) <= new Date(endDate));
    return matchesStatus && matchesDateRange;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Worker Tasks
      </Typography>

      {/* Filters */}
      <Box sx={{ marginBottom: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Task List */}
      <Grid container spacing={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{task.name}</Typography>
                <Typography variant="body2">
                  <strong>Due Date:</strong> {task.dueDate}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong> {task.status}
                </Typography>
                {task.status !== "Completed" && (
                  <Button
                    onClick={() => handleMarkCompleted(task.id)}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                  >
                    Mark as Completed
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkerTasksPage;
