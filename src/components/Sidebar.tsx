import React from "react";
import { Box, List, ListItem, ListItemText, ListItemButton, Typography } from "@mui/material";
import { useNavigation } from "../hooks/useNavigation";

const Sidebar: React.FC = () => {
  const { navigateTo } = useNavigation();

  const pages = [
    { name: "Dashboard", path: "/worker/dashboard" },
    { name: "Tasks", path: "/worker/tasks" },
    { name: "Budgets", path: "/worker/budgets" },
    { name: "Estimates", path: "/worker/estimates" },
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
