import React from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ProjectAccordionProps {
  project: any; // Replace 'any' with your project type
  expanded: number | false;
  handleAccordionChange: (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({ project, expanded, handleAccordionChange }) => {
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

        <Typography variant="subtitle1">
          <strong>Budgets:</strong>
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Budget ID</TableCell>
                <TableCell>Budget Limit</TableCell>
                <TableCell>Current Spend</TableCell>
                <TableCell>Remaining Budget</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {project.budgets.map((budget: any) => (
                <TableRow key={budget.budgetId}>
                  <TableCell>{budget.budgetId}</TableCell>
                  <TableCell>${budget.budgetLimit}</TableCell>
                  <TableCell>${budget.currentSpend}</TableCell>
                  <TableCell>${budget.remainingBudget}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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