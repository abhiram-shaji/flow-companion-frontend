import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingState: React.FC = () => (
  <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
    <CircularProgress />
  </Box>
);

export default LoadingState;