import React from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Box, Button, Container, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box 
      bgcolor="grey.100" 
      py={2} 
      boxShadow={1}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
        }}
      >
        <Typography variant="h6">Your Logo</Typography>
        <Button 
            variant="outlined" 
            color="primary"
        >
            Sign in / Sign up
        </Button>
      </Container>
    </Box>
  );
}
