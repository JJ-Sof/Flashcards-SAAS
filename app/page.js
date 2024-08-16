"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getStripe from "utils/get-stripe";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Testimonials from "./components/Testimonials";
import MeetTheCreators from "./components/MeetTheCreators";

export default function LandingPage() {
  const router = useRouter();

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
    router.push("/dashboard");
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        height="650px"
        bgcolor="#e1e3fc"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        my={4}
        borderRadius={2}
        textAlign="center"
        padding={15}
      >
        <Image
          src="/smartflash3.ico"
          alt="SmartFlash Logo"
          width={450}
          height={450}
        />
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            color: "#2B2E3A",
            letterSpacing: "0.5px",
            lineHeight: "1.2",
            // textTransform: "uppercase",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            mb: 4, // Margin-bottom
          }}
        >
          Flash Forward to Smarter Learning!
        </Typography>

        {/* <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            color: "#1a1d27",
            letterSpacing: "0.5px",
            lineHeight: "1.2",
            textTransform: "uppercase",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            mb: 5, // Margin-bottom
          }}
        >
          Flash Forward to Smarter Learning!
        </Typography> */}

        {/* <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{
            fontFamily: "Poppins, sans-serif",
            // fontWeight: "bold",
            color: "#2B2E3A",
            letterSpacing: "0.5px",
            lineHeight: "1.2",
            // textTransform: "uppercase",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            mb: 2, // Margin-bottom
          }}
        >
          Ready to level up your knowledge game? Dive into SmartFlash Studio
          today. Remember, the coolest minds flash forward!
        </Typography> */}
        <Box mt={2}>
          {/* <Typography variant="body1" component="p" gutterBottom>
            Join the SmartFlash Revolution!
          </Typography> */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Flashcard Demo */}
      <Box
        height="600px"
        bgcolor="#E4E6EF"
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={8}
        borderRadius={2}
        overflow="hidden" // Ensures iframe doesn't overflow
        mb={8}
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

      {/* features */}
      <Box height="800px" padding={10}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            color: "#1a1d27",
            textAlign: "center",
            mb: 6,
          }}
        >
          Features
        </Typography>
        <Grid container spacing={3} my={4}>
          <Grid item xs={12} md={4}>
            <Box
              height="400px"
              bgcolor="#f5f5f5"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={3}
              sx={{
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                  bgcolor: "#1a1d27", // Dark background on hover
                  "& .feature-title, & .feature-text": {
                    color: "#FFFFFF", // Light text color on hover
                  },
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                className="feature-title"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#1a1d27", // Dark text color by default
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  mb: 5, // Margin-bottom
                  textAlign: "center",
                  transition: "color 0.3s ease",
                }}
              >
                AI-Powered Insights
              </Typography>
              <Typography
                variant="body1"
                className="feature-text"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  // fontWeight: "bold",
                  color: "#1a1d27", // Dark text color by default
                  letterSpacing: "0.5px",
                  lineHeight: "1.8",
                  textAlign: "center",
                  p: 2,
                  transition: "color 0.3s ease",
                }}
              >
                Harness the power of AI to track your progress and provide
                intelligent recommendations, helping you focus on areas that
                need improvement and boosting your performance.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              height="400px"
              bgcolor="#f5f5f5"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={3}
              sx={{
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                  bgcolor: "#1a1d27", // Dark background on hover
                  "& .feature-title, & .feature-text": {
                    color: "#FFFFFF", // Light text color on hover
                  },
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                className="feature-title"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#1a1d27", // Dark text color by default
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  mb: 5, // Margin-bottom
                  textAlign: "center",
                  transition: "color 0.3s ease",
                }}
              >
                Interactive Gamification
              </Typography>
              <Typography
                variant="body1"
                className="feature-text"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  // fontWeight: "bold",
                  color: "#1a1d27", // Dark text color by default
                  letterSpacing: "0.5px",
                  lineHeight: "1.8",
                  textAlign: "center",
                  p: 2,
                  transition: "color 0.3s ease",
                }}
              >
                Make learning fun and engaging with interactive quizzes and
                challenges that transform studying into an exciting game,
                keeping you motivated and on track.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              height="400px"
              bgcolor="#f5f5f5"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={3}
              sx={{
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                  bgcolor: "#1a1d27", // Dark background on hover
                  "& .feature-title, & .feature-text": {
                    color: "#FFFFFF", // Light text color on hover
                  },
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                className="feature-title"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#1a1d27", // Dark text color by default
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  mb: 5, // Margin-bottom
                  textAlign: "center",
                  transition: "color 0.3s ease",
                }}
              >
                Personalized Paths
              </Typography>
              <Typography
                variant="body1"
                className="feature-text"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  // fontWeight: "bold",
                  color: "#1a1d27", // Dark text color by default
                  letterSpacing: "0.5px",
                  lineHeight: "1.8",
                  textAlign: "center",
                  p: 2,
                  transition: "color 0.3s ease",
                }}
              >
                Tailor your study experience with customized flashcard sets
                designed to match your unique learning style and pace, ensuring
                maximum retention and efficiency.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Payment Options */}

      <Box
        sx={{
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
          height: "700px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            color: "#1a1d27",
            textAlign: "center",
            mb: 8,
          }}
        >
          Choose Your Plan
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Free Trial Plan */}
          <Grid item xs={12} md={5}>
            <Box
              bgcolor="#f4f4f9"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={4}
              height="400px"
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#1a1d27",
                  textAlign: "center",
                  mb: 2,
                }}
              >
                Free Trial
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#555",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                Generate one flashcard set only. Explore our flashcards and see
                how they can help you with your learning needs.
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Get Free Trial
              </Button>
            </Box>
          </Grid>
          {/* Premium Plan */}
          <Grid item xs={12} md={5}>
            <Box
              bgcolor="#2B2E3A"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={4}
              height="400px"
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  textAlign: "center",
                  mb: 2,
                }}
              >
                Premium - $10/month
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#F0F1FA",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                Get unlimited access to generate flashcard sets. Perfect for
                long-term learning and mastering new subjects!
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#f4f4f9",
                  color: "#2B2E3A", // Set text color to contrast with the background
                  "&:hover": {
                    backgroundColor: "#e0e0e0", // Slightly darker shade on hover
                  },
                }}
              >
                Get Premium
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Testimonials */}
      <Box height="700px" padding={5}>
        <Testimonials />
      </Box>

      {/* Meet the Creators */}
      <Box height="600px" padding={5}>
        <MeetTheCreators />
      </Box>
    </Container>
  );
}
