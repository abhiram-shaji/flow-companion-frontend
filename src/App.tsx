import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AdminTasksPage from "./pages/AdminTasksPage";
import AdminBudgetsPage from "./pages/AdminBudgetsPage";
import AdminEstimatesPage from "./pages/AdminEstimatesPage";

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
            <Route path="/admin/projects/:id" element={<ProjectDetailsPage />} />
            <Route path="/admin/tasks" element={<AdminTasksPage />} />
            <Route path="/admin/budgets" element={<AdminBudgetsPage />} />
            <Route path="/admin/estimates" element={<AdminEstimatesPage />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    );
  };

export default App;
