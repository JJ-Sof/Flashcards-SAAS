import React from "react";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
<<<<<<< HEAD
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Testimonials from '../components/Testimonials';
import MuiThemeProvider from '../app/theme';
import MeetTheCreators from '../components/MeetTheCreators';
=======
import { Box, Button, Container, Grid, Typography } from "@mui/material";
>>>>>>> 97df1d1de045633bc51743b16f5a6efd029d29f7

export default function LandingPage() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http/localhost:3000",
      },
    });
    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };
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
<<<<<<< HEAD
      <Box height = "500px" padding={5}>
      <MeetTheCreators />
=======
      <Box textAlign="center" my={4}>
        <Typography variant="h4" mb={2}>
          Meet the Creators!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {/* Placeholder for Creator images */}
          <Grid item xs={4} md={2}>
            <Box
              height="100px"
              width="100px"
              bgcolor="grey.200"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mx="auto"
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Box
              height="100px"
              width="100px"
              bgcolor="grey.200"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mx="auto"
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Box
              height="100px"
              width="100px"
              bgcolor="grey.200"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mx="auto"
            />
          </Grid>
        </Grid>
>>>>>>> 97df1d1de045633bc51743b16f5a6efd029d29f7
      </Box>


    </Container>
    </MuiThemeProvider>
  );
}
