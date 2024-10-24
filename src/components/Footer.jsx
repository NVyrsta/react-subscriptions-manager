import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ py: 2, textAlign: "center", borderTop: "1px solid #ddd" }}
    >
      <Typography variant="body2">
        Pulse Intelligence@ 2024. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
