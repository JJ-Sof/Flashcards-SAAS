import React from "react";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

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
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        height="400px"
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
        height="300px"
        bgcolor="grey.200"
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={4}
        borderRadius={2}
      >
        <Typography variant="h4">Flashcard Demo (GIF/Video)</Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={3} my={4}>
        <Grid item xs={12} md={4}>
          <Box
            height="200px"
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
            height="200px"
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
            height="200px"
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

      {/* Payment Options */}
      <Grid container spacing={3} my={4}>
        <Grid item xs={12} md={6}>
          <Box
            height="150px"
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
            height="150px"
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

      {/* Testimonials */}
      <Box
        height="200px"
        bgcolor="grey.200"
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={4}
        borderRadius={2}
      >
        <Typography variant="h5">Testimonials</Typography>
      </Box>

      {/* Meet the Creators */}
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
      </Box>
    </Container>
  );
}
