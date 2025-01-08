import React from "react";
import { Box, List, ListItem, ListItemText, ListItemButton, Typography } from "@mui/material";
import { useNavigation } from "../hooks/useNavigation";

const Sidebar: React.FC = () => {
  const { navigateTo } = useNavigation();

  const pages = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Tasks", path: "/admin/tasks" },
    { name: "Manage Budgets", path: "/admin/budgets" },
    { name: "Manage Estimates", path: "/admin/estimates" },
    { name: "Projects", path: "/admin/projects" },
  ];

  return (
    <Box sx={{ width: 250, bgcolor: "#f4f4f4", height: "100vh", padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Admin Panel
      </Typography>
      <List>
        {pages.map((page) => (
          <ListItem disablePadding key={page.name}>
            <ListItemButton onClick={() => navigateTo(page.path)}>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
