import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface AddBudgetModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (budget: { budgetLimit: number; currentSpend: number }) => void;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ open, onClose, onSubmit }) => {
  const [budgetLimit, setBudgetLimit] = useState<number>(0);
  const [currentSpend, setCurrentSpend] = useState<number>(0);

  const handleSubmit = () => {
    onSubmit({ budgetLimit, currentSpend });
    onClose();
    setBudgetLimit(0);
    setCurrentSpend(0);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Budget</DialogTitle>
      <DialogContent>
        <TextField
          label="Budget Limit"
          type="number"
          fullWidth
          margin="dense"
          value={budgetLimit}
          onChange={(e) => setBudgetLimit(Number(e.target.value))}
        />
        <TextField
          label="Current Spend"
          type="number"
          fullWidth
          margin="dense"
          value={currentSpend}
          onChange={(e) => setCurrentSpend(Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Budget
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBudgetModal;
