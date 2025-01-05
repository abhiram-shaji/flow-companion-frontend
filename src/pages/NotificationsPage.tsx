import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";

interface Notification {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "Budget Alert",
      message: "Project A is nearing its budget limit.",
      timestamp: "2023-11-20 10:00 AM",
      isRead: false,
    },
    {
      id: 2,
      type: "Task Update",
      message: "Task B has been marked as completed.",
      timestamp: "2023-11-19 2:30 PM",
      isRead: true,
    },
    {
      id: 3,
      type: "Deadline Reminder",
      message: "Task C is due tomorrow.",
      timestamp: "2023-11-18 4:00 PM",
      isRead: false,
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

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
                    onClick={() => handleMarkAsRead(notification.id)}
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
          onClick={handleClearAll}
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
