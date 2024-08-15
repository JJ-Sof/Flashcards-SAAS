import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box bgcolor="#2B2E3A" py={3} boxShadow={1}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" sx={{ color: "#F0F1FA" }}>
          © {new Date().getFullYear()} SmartFlash. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
