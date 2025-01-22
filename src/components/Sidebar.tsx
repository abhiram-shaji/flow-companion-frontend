import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  // Get the user's role from localStorage (or any other storage method you're using)
  const role = localStorage.getItem("role") || "worker";

  const handleLogout = () => {
    // Clear user-related data
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    // Navigate back to the login page
    navigate("/");
  };

  // Define pages based on role
  const pages = role === "admin"
    ? [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Manage Tasks", path: "/admin/tasks" },
        { name: "Manage Projects", path: "/admin/ProjectOverview" },
        { name: "Manage Supervisors", path: "/admin/user-management" },
      ]
    : [
        { name: "Dashboard", path: "/worker/dashboard" },
        { name: "Tasks", path: "/worker/tasks" },
        { name: "Budgets", path: "/worker/budgets" },
        { name: "Estimates", path: "/worker/estimates" },
      ];

  return (
    <Box sx={{ width: 250, bgcolor: "#f4f4f4", height: "100vh", padding: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      {/* Top Section with Navigation */}
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {role === "admin" ? "Admin Panel" : "Worker Panel"}
        </Typography>
        <List>
          {pages.map((page) => (
            <ListItem disablePadding key={page.name}>
              <ListItemButton onClick={() => navigate(page.path)}>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ padding: 2 }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
