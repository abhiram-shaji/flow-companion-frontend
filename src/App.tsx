import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ProjectsPage from "./pages/ProjectsPage";
import AdminTasksPage from "./pages/AdminTasksPage";

import WorkerTasksPage from "./pages/WorkerTasksPage";

import NotificationsPage from "./pages/NotificationsPage";

import ErrorPage from "./pages/ErrorPage";

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    try {
      return <>{children}</>;
    } catch (error) {
      console.error(error);
      return <h1>An error occurred while loading the page.</h1>;
    }
  };
  
  const App: React.FC = () => {
    return (
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LoginPage />} />
  
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/projects" element={<ProjectsPage />} />
            <Route path="/admin/tasks" element={<AdminTasksPage />} />
            <Route path="/worker/tasks" element={<WorkerTasksPage />} />
            ProjectDetailsPage
  
            <Route path="/notifications" element={<NotificationsPage />} />
  
            {/* Catch-all route for 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    );
  };

export default App;
