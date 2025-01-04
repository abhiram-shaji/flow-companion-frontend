import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;
