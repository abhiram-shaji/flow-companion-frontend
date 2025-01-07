import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useNotifications } from "../hooks/useNotifications";

const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead, clearAllNotifications } =
    useNotifications();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>

      {/* Notification List */}
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        {notifications.map((notification) => (
          <Grid item xs={12} key={notification.id}>
            <Card
              sx={{
                backgroundColor: notification.isRead ? "#f5f5f5" : "#fff",
                borderLeft: notification.isRead
                  ? "5px solid #d3d3d3"
                  : "5px solid #36A2EB",
              }}
            >
              <CardContent>
                <Typography variant="h6">{notification.type}</Typography>
                <Typography variant="body2">{notification.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.timestamp}
                </Typography>
                {!notification.isRead && (
                  <Button
                    onClick={() => markAsRead(notification.id)}
                    variant="contained"
                    size="small"
                    sx={{ marginTop: 2 }}
                  >
                    Mark as Read
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <Button
          onClick={clearAllNotifications}
          variant="contained"
          color="error"
          sx={{ marginTop: 2 }}
        >
          Clear All
        </Button>
      )}
    </Box>
  );
};

export default NotificationsPage;
