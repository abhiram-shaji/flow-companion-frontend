import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (projectData: {
    name: string;
    budget: number;
    startDate: string;
    endDate: string;
  }) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("https://flow-companion-backend.onrender.com/api/projects", {
        name: formData.name,
        budget: Number(formData.budget),
        startDate: formData.startDate,
        endDate: formData.endDate,
      });
      console.log(response.data);
      onSubmit({
        name: formData.name,
        budget: Number(formData.budget),
        startDate: formData.startDate,
        endDate: formData.endDate,
      });
      onClose();
      setFormData({ name: "", budget: "", startDate: "", endDate: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Project
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Stack spacing={2}>
          <TextField
            label="Project Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={
              loading ||
              !formData.name ||
              !formData.budget ||
              !formData.startDate ||
              !formData.endDate
            }
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddProjectModal;
