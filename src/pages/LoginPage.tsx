import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("/api/auth/login", { email, password });
            const { token, role } = response.data;

            localStorage.setItem("token", token);
            if (role === "Admin") {
                navigate("/admin/dashboard");
            } else if (role === "Worker") {
                navigate("/worker/dashboard");
            }
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            {error && (
                <Typography color="error" variant="body2" mt={1}>
                    {error}
                </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
                Login
            </Button>
        </Box>
    );
};

export default LoginPage;
