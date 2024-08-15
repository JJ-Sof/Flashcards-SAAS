"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getStripe from "utils/get-stripe";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Testimonials from "components/Testimonials";
import MeetTheCreators from "@/components/MeetTheCreators";

export default function LandingPage() {
  const router = useRouter(); // Initialize useRouter

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

  const handleGetStarted = () => {
    router.push("/dashboard"); // Redirect to the dashboard page
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        height="600px"
        bgcolor="grey.200"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        my={4}
        borderRadius={2}
        textAlign="center"
        padding={20}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Flash Forward to Smarter Learning!
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Where learning meets innovation. Our dynamic flashcards transform the
          way you absorb knowledge — gamified, personalized, and always
          engaging. Join us on the journey to smarter learning!
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Ready to level up your knowledge game? Dive into SmartFlash Studio
          today. Remember, the coolest minds flash forward!
        </Typography>
        <Box mt={4}>
          <Typography variant="body1" component="p" gutterBottom>
            Join the SmartFlash Revolution!
          </Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
          </Box>
        </Box>
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
      <Box height="800px" padding={10}>
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
      <Box height="600px" padding={10}>
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
              <Button variant="contained" onClick={handleSubmit}>
                Payment Option 02
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Testimonials */}
      <Box height="500px" padding={5}>
        <Testimonials />
      </Box>

      {/* Meet the Creators */}
      <Box height="500px" padding={5}>
        <MeetTheCreators />
      </Box>
    </Container>
  );
}
