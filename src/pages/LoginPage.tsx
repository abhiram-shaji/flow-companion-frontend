import React from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import useLogin from "../hooks/useLogin"; // Adjust the path as per your file structure.

const LoginPage: React.FC = () => {
  const { email, setEmail, password, setPassword, error, handleLogin } = useLogin();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h4" gutterBottom>
        Flow Companion
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
