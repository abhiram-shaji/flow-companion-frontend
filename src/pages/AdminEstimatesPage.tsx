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
} from "@mui/material";

const AdminEstimatesPage: React.FC = () => {
  const [estimates, setEstimates] = useState([
    {
      id: 1,
      projectName: "Project A",
      cost: 15000,
      deadline: "2023-12-31",
      description: "Initial project estimate.",
    },
    {
      id: 2,
      projectName: "Project B",
      cost: 20000,
      deadline: "2024-06-30",
      description: "Extended phase estimate.",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [estimateData, setEstimateData] = useState({
    id: 0,
    projectName: "",
    cost: "",
    deadline: "",
    description: "",
  });

  const handleOpen = (estimate?: typeof estimateData) => {
    setEstimateData(
      estimate || { id: 0, projectName: "", cost: "", deadline: "", description: "" }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (estimateData.id === 0) {
      // Add new estimate
      setEstimates([
        ...estimates,
        {
          ...estimateData,
          id: estimates.length + 1,
          cost: Number(estimateData.cost),
        },
      ]);
    } else {
      // Update existing estimate
      setEstimates(
        estimates.map((estimate) =>
          estimate.id === estimateData.id
            ? {
                ...estimateData,
                cost: Number(estimateData.cost),
              }
            : estimate
        )
      );
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setEstimates(estimates.filter((estimate) => estimate.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Estimate Management
      </Typography>

      {/* Estimates Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Estimated Cost</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimates.map((estimate) => (
              <TableRow key={estimate.id}>
                <TableCell>{estimate.projectName}</TableCell>
                <TableCell>${estimate.cost}</TableCell>
                <TableCell>{estimate.deadline}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpen({ ...estimate, cost: estimate.cost.toString() })}
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(estimate.id)}
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

      {/* Add Estimate Button */}
      <Button
        onClick={() => handleOpen()}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Add Estimate
      </Button>

      {/* Add/Edit Estimate Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {estimateData.id === 0 ? "Add Estimate" : "Edit Estimate"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            value={estimateData.projectName}
            onChange={(e) =>
              setEstimateData({ ...estimateData, projectName: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Estimated Cost"
            type="number"
            fullWidth
            value={estimateData.cost}
            onChange={(e) =>
              setEstimateData({ ...estimateData, cost: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Deadline"
            type="date"
            fullWidth
            value={estimateData.deadline}
            onChange={(e) =>
              setEstimateData({ ...estimateData, deadline: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={estimateData.description}
            onChange={(e) =>
              setEstimateData({ ...estimateData, description: e.target.value })
            }
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

export default AdminEstimatesPage;
