import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigation } from "../hooks/useNavigation";

const Sidebar: React.FC = () => {
  const { navigateTo } = useNavigation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pages = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Tasks", path: "/admin/tasks" },
    { name: "Manage Budgets", path: "/admin/budgets" },
    { name: "Manage Estimates", path: "/admin/estimates" },
    { name: "Projects", path: "/admin/projects" },
    { name: "User Accounts", path: "/admin/user-management" },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250, bgcolor: "#f4f4f4", height: "100vh", padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Admin Panel
      </Typography>
      <List>
        {pages.map((page) => (
          <ListItem disablePadding key={page.name}>
            <ListItemButton
              onClick={() => {
                navigateTo(page.path);
                if (isMobile) setDrawerOpen(false);
              }}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ position: "fixed", top: 10, left: 10 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better performance on mobile
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Box sx={{ width: 250, bgcolor: "#f4f4f4", height: "100vh", padding: 2 }}>
          {drawerContent}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
