import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import useTaskManagement from "../hooks/useTaskManagement";

const TaskManagement: React.FC = () => {
  const { tasks, addTask, editTask, deleteTask, markTaskAsComplete, loading, error } =
    useTaskManagement();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [currentTask, setCurrentTask] = useState<{
    taskId?: number;
    projectId: number;
    taskName: string;
    assignedTo: number;
    dueDate: string;
    status: string;
  }>({
    taskId: undefined,
    projectId: 0,
    taskName: "",
    assignedTo: 0,
    dueDate: "",
    status: "Pending",
  });

  const handleOpenDialog = (mode: "add" | "edit", task?: typeof currentTask) => {
    setDialogMode(mode);
    setCurrentTask(
      task || {
        taskId: undefined,
        projectId: 0,
        taskName: "",
        assignedTo: 0,
        dueDate: "",
        status: "Pending",
      }
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveTask = async () => {
    if (dialogMode === "add") {
      await addTask(
        currentTask.projectId,
        currentTask.taskName,
        currentTask.assignedTo,
        currentTask.dueDate,
        currentTask.status
      );
    } else if (dialogMode === "edit" && currentTask.taskId) {
      await editTask(
        currentTask.taskId,
        currentTask.taskName,
        currentTask.assignedTo,
        currentTask.dueDate,
        currentTask.status
      );
    }
    setDialogOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: { sm: 250 },
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          padding: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Task Management
        </Typography>

        {loading && (
          <Typography variant="h6" color="primary" sx={{ marginBottom: 2 }}>
            Loading tasks...
          </Typography>
        )}

        {error && (
          <Typography variant="h6" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog("add")}
          sx={{ marginBottom: 2 }}
        >
          Add Task
        </Button>

        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.taskId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{task.taskName}</Typography>
                  <Typography>Project ID: {task.projectId}</Typography>
                  <Typography>Assigned To: {task.assignedTo}</Typography>
                  <Typography>Due Date: {task.dueDate}</Typography>
                  <Typography>Status: {task.status}</Typography>

                  <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleOpenDialog("edit", {
                          taskId: task.taskId,
                          projectId: task.projectId,
                          taskName: task.taskName,
                          assignedTo: task.assignedTo,
                          dueDate: task.dueDate,
                          status: task.status,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteTask(task.taskId)}
                    >
                      Delete
                    </Button>
                    {task.status !== "Complete" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => markTaskAsComplete(task.taskId)}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add/Edit Task Dialog */}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{dialogMode === "add" ? "Add Task" : "Edit Task"}</DialogTitle>
          <DialogContent>
            <TextField
              label="Project ID"
              fullWidth
              margin="dense"
              type="number"
              value={currentTask.projectId}
              onChange={(e) =>
                setCurrentTask((prev) => ({ ...prev, projectId: Number(e.target.value) }))
              }
            />
            <TextField
              label="Task Name"
              fullWidth
              margin="dense"
              value={currentTask.taskName}
              onChange={(e) =>
                setCurrentTask((prev) => ({ ...prev, taskName: e.target.value }))
              }
            />
            <TextField
              label="Assigned To"
              fullWidth
              margin="dense"
              type="number"
              value={currentTask.assignedTo}
              onChange={(e) =>
                setCurrentTask((prev) => ({ ...prev, assignedTo: Number(e.target.value) }))
              }
            />
            <TextField
              label="Due Date"
              fullWidth
              margin="dense"
              type="date"
              value={currentTask.dueDate}
              onChange={(e) =>
                setCurrentTask((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Status"
              fullWidth
              margin="dense"
              value={currentTask.status}
              onChange={(e) =>
                setCurrentTask((prev) => ({ ...prev, status: e.target.value }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveTask} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default TaskManagement;
