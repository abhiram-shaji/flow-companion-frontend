// components/UpdateBudgetModal.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";

interface UpdateBudgetModalProps {
  open: boolean;
  onClose: () => void;
  budgetId?: number; // ID of the budget to update
  onSubmit: (updatedBudget: any) => void;
  projectId: any;
}

const UpdateBudgetModal: React.FC<UpdateBudgetModalProps> = ({
  open,
  onClose,
  budgetId,
  onSubmit,
}) => {
  const [budgetDetails, setBudgetDetails] = useState<any>(null);
  const [budgetLimit, setBudgetLimit] = useState(0);
  const [currentSpend, setCurrentSpend] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch budget details when the modal opens
  useEffect(() => {
    if (open && budgetId) {
      setLoading(true);
      axios
        .get(`https://flow-companion-backend.onrender.com/api/budgets/project/6`)
        .then((response) => {
          setBudgetDetails(response.data);
          setBudgetLimit(response.data.budgetLimit);
          setCurrentSpend(response.data.currentSpend);
        })
        .catch((error) => {
          console.error("Error fetching budget details:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [open, budgetId]);

  const handleUpdateBudget = () => {
    if (!budgetId) return;

    const updatedBudget = {
      budgetLimit,
      currentSpend,
    };

    axios
      .put(`https://flow-companion-backend.onrender.com/api/budgets/${budgetId}`, updatedBudget)
      .then((response) => {
        console.log("Budget updated successfully:", response.data);
        onSubmit(response.data); // Pass updated budget to parent component
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating budget:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Budget</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <CircularProgress />
          </Box>
        ) : budgetDetails ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>
              <strong>Project ID:</strong> {budgetDetails.projectId}
            </Typography>
            <TextField
              label="Budget Limit"
              type="number"
              fullWidth
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(Number(e.target.value))}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              label="Current Spend"
              type="number"
              fullWidth
              value={currentSpend}
              onChange={(e) => setCurrentSpend(Number(e.target.value))}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Box>
        ) : (
          <Typography>Error loading budget details.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleUpdateBudget}
          color="primary"
          disabled={loading || !budgetDetails}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateBudgetModal;
