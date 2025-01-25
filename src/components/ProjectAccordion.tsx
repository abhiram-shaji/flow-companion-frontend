// components/ProjectAccordion.tsx
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UpdateBudgetModal from "./UpdateBudgetModal";

interface ProjectAccordionProps {
  project: any; // Replace 'any' with your project type
  expanded: number | false;
  handleAccordionChange: (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({ project, expanded, handleAccordionChange }) => {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  const handleAddBudget = (updatedBudget: any) => {
    console.log("Updated Budget:", updatedBudget);
    // Add logic to update the parent state with the new budget
  };

  return (
    <Accordion
      key={project.projectId}
      expanded={expanded === project.projectId}
      onChange={handleAccordionChange(project.projectId)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{project.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography>
              <strong>Start Date:</strong> {project.startDate}
            </Typography>
            <Typography>
              <strong>End Date:</strong> {project.endDate}
            </Typography>
            <Typography>
              <strong>Total Budget:</strong> ${project.budget}
            </Typography>
            <Typography>
              <strong>Current Spend:</strong> ${project.currentSpend}
            </Typography>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsBudgetModalOpen(true)}
        >
          Update Budget
        </Button>

        <UpdateBudgetModal
          open={isBudgetModalOpen}
          onClose={() => setIsBudgetModalOpen(false)}
          onSubmit={handleAddBudget}
          projectId={project.projectId} // Pass projectId to fetch budget details
        />

        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          <strong>Estimates:</strong>
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Estimate ID</TableCell>
                <TableCell>Estimated Cost</TableCell>
                <TableCell>Deadline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {project.estimates.map((estimate: any) => (
                <TableRow key={estimate.estimateId}>
                  <TableCell>{estimate.estimateId}</TableCell>
                  <TableCell>${estimate.estimatedCost}</TableCell>
                  <TableCell>{estimate.deadline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectAccordion;
