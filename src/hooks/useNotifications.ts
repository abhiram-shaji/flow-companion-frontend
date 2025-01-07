import { useState } from "react";

interface Notification {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const useNotifications = () => {
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

  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    markAsRead,
    clearAllNotifications,
  };
};
