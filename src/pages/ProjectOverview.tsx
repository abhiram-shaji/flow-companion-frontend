import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import useProjects from "../hooks/useProjects";
import AddProjectModal from "../components/AddProjectModal";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import ProjectAccordion from "../components/ProjectAccordion";

const ProjectOverview: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const [expanded, setExpanded] = useState<number | false>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccordionChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAddProject = (newProject: any) => {
    console.log("New Project:", newProject);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          width: { sm: 250 },
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>

      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Project Overview
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2 }}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Project
        </Button>

        <AddProjectModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddProject}
        />

        {loading && <LoadingState />}
        {error && <ErrorState error={error} />}
        {!loading &&
          !error &&
          projects.map((project) => (
            <ProjectAccordion
              key={project.projectId}
              project={project}
              expanded={expanded}
              handleAccordionChange={handleAccordionChange}
            />
          ))}
      </Box>
    </Box>
  );
};

export default ProjectOverview;
