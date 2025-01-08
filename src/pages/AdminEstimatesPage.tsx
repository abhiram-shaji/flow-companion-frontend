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
} from "@mui/material";
import { useManageEstimates } from "../hooks/useManageEstimates";
import Sidebar from "../components/AdminSidebar";
import { useEstimateDialog } from "../hooks/useEstimateDialog";

const AdminEstimatesPage: React.FC = () => {
  const { estimates, addOrUpdateEstimate, deleteEstimate } =
    useManageEstimates();
  const { open, estimateData, setEstimateData, openDialog, closeDialog } =
    useEstimateDialog();

  const handleSave = () => {
    addOrUpdateEstimate(estimateData);
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
                      onClick={() =>
                        openDialog({
                          ...estimate,
                          cost: estimate.cost.toString(),
                        })
                      }
                      variant="contained"
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteEstimate(estimate.id)}
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
          onClick={() => openDialog()}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Estimate
        </Button>

        {/* Add/Edit Estimate Dialog */}
        <Dialog open={open} onClose={closeDialog} fullWidth>
          <DialogTitle>
            {estimateData.id === 0 ? "Add Estimate" : "Edit Estimate"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Project Name"
              fullWidth
              value={estimateData.projectName}
              onChange={(e) =>
                setEstimateData({
                  ...estimateData,
                  projectName: e.target.value,
                })
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
                setEstimateData({
                  ...estimateData,
                  description: e.target.value,
                })
              }
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

export default AdminEstimatesPage;
