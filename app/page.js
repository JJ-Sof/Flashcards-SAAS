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
        <Typography
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
        </Typography>
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
          Where learning meets innovation. Our dynamic flashcards transform the
          way you absorb knowledge — gamified, personalized, and always
          engaging. Join us on the journey to smarter learning!
        </Typography>
        <Typography
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
        </Typography>
        <Box mt={2}>
          <Typography variant="body1" component="p" gutterBottom>
            Join the SmartFlash Revolution!
          </Typography>
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
        <Box
          sx={{
            mb: 15, // Margin-bottom to add space below the heading
            p: 2, // Padding around the heading
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#e1e3fc",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)", // increase size on hover
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // shadow on hover
            },
          }}
        >
          <Typography
            variant="h5"
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
              mb: 1, // Margin-bottom
              textAlign: "center",
              transition: "color 0.3s ease, text-shadow 0.3s ease",
              "&:hover": {
                color: "#0d47a1",
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Features
          </Typography>
        </Box>
        <Grid container spacing={3} my={4}>
          <Grid item xs={12} md={4}>
            <Box
              height="400px"
              bgcolor="#2B2E3A"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={3}
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  mb: 5, // Margin-bottom
                  textAlign: "center",
                }}
              >
                Customization
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.8",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  p: 2,
                }}
              >
                Tailored to your learning style and preferences, our flashcards
                cover a wide range of subjects — from mathematics to history,
                science to language arts.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              height="400px"
              bgcolor="#2B2E3A"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={3}
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  mb: 5, // Margin-bottom
                  textAlign: "center",
                }}
              >
                Rapid Retention
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.8",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  p: 2,
                }}
              >
                Say goodbye to information overload! Our concise flashcards
                ensure that key concepts stick in your memory, ready to be
                recalled whenever you need them.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              height="400px"
              bgcolor="#2B2E3A"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={3}
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  mb: 3, // Margin-bottom
                  textAlign: "center",
                }}
              >
                Innovation
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.8",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  p: 2,
                }}
              >
                We’re not your average flashcard platform. SmartFlash Studio
                combines cutting-edge technology with pedagogical expertise,
                making learning engaging and interactive!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Payment Options */}
      <Box height="700px" padding={10}>
        <Box
          sx={{
            mb: 15, // Margin-bottom below the heading
            p: 2,
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#e1e3fc",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Typography
            variant="h5"
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
              mb: 1, // Margin-bottom
              textAlign: "center",
              transition: "color 0.3s ease, text-shadow 0.3s ease",
              "&:hover": {
                color: "#0d47a1",
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Plans
          </Typography>
        </Box>
        <Grid container spacing={3} my={4}>
          <Grid item xs={12} md={6}>
            <Box
              height="300px"
              bgcolor="#2B2E3A"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start" // Align items to the top
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={3}
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  mb: 5,
                  textAlign: "center",
                }}
              >
                Plan 1
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.8",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  p: 2,
                }}
              >
                Tailored to your learning style and preferences, our flashcards
                cover a wide range of subjects — from mathematics to history,
                science to language arts.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              height="300px"
              bgcolor="#2B2E3A"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              borderRadius={2}
              boxShadow={3}
              p={3}
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  mb: 5,
                  textAlign: "center",
                }}
              >
                Plan 2
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#F0F1FA",
                  letterSpacing: "0.5px",
                  lineHeight: "1.8",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  p: 2,
                }}
              >
                Tailored to your learning style and preferences, our flashcards
                cover a wide range of subjects — from mathematics to history,
                science to language arts.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Testimonials */}
      <Box height="700px" padding={5}>
        <Testimonials />
      </Box>

      {/* Meet the Creators */}
      <Box height="650px" padding={5}>
        <MeetTheCreators />
      </Box>
    </Container>
  );
}
