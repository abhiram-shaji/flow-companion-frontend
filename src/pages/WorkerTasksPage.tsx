import React from "react";
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
import { useManageTasks } from "../hooks/useManageTasks";

const WorkerTasksPage: React.FC = () => {
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
        {tasks.map((task) => (
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
