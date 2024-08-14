import React from 'react';
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Testimonials from '../components/Testimonials';
import MuiThemeProvider from '../app/theme';
import MeetTheCreators from '../components/MeetTheCreators';

export default function LandingPage() {
  return (
    <MuiThemeProvider>
    <Container maxWidth="lg">
      
      {/* Hero Section */}
      <Box
        height="600px"
        bgcolor="grey.200"
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={4}
        borderRadius={2}
      >
        <Typography variant="h3">HERO SECTION</Typography>
      </Box>

      {/* Get Started Button */}
      <Box textAlign="center" my={4}>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>

      {/* Flashcard Demo */}
      <Box
  height="600px"
  bgcolor="grey.200"
  display="flex"
  justifyContent="center"
  alignItems="center"
  my={4}
  borderRadius={2}
  overflow="hidden" // Ensures iframe doesn't overflow
>
  <iframe
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/1SBxsv_T_Jw?controls=0&loop=1&playlist=1SBxsv_T_Jw&modestbranding=1&playsinline=1&autoplay=1"
    title="Flashcard Demo"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</Box>


      {/* Features Section */}
      <Box height = "800px" padding={10}>
      <Grid container spacing={3} my={4}>
        <Grid item xs={12} md={4}>
          <Box
            height="500px"
            bgcolor="grey.200"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={2}
          >
            <Typography variant="h5">Feature 01</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            height="500px"
            bgcolor="grey.200"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={2}
          >
            <Typography variant="h5">Feature 02</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            height="500px"
            bgcolor="grey.200"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={2}
          >
            <Typography variant="h5">Feature 03</Typography>
          </Box>
        </Grid>
      </Grid>
      </Box>

      {/* Payment Options */}
      <Box height = "600px" padding={10}>
      <Grid container spacing={3} my={4}>
        <Grid item xs={12} md={6}>
          <Box
            height="300px"
            bgcolor="grey.200"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={2}
          >
            <Typography variant="h6">Payment Option 01</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            height="300px"
            bgcolor="grey.200"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={2}
          >
            <Typography variant="h6">Payment Option 02</Typography>
          </Box>
        </Grid>
      </Grid>
      </Box>

      {/* Testimonials */}
      <Box height = "500px" padding={5}>
        <Testimonials />
      </Box>

      {/* Meet the Creators */}
      <Box height = "500px" padding={5}>
      <MeetTheCreators />
      </Box>


    </Container>
    </MuiThemeProvider>
  );
}
