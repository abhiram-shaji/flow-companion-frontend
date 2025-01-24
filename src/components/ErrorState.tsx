import React from "react";
import { Alert } from "@mui/material";

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => <Alert severity="error">{error}</Alert>;

export default ErrorState;