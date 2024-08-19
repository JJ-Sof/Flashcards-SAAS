"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getStripe from "utils/get-stripe";
import { Box, Button, Container, Grid, Typography, Modal } from "@mui/material";
import Testimonials from "./components/Testimonials";
import MeetTheCreators from "./components/MeetTheCreators";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth, useClerk } from "@clerk/nextjs";
import GradientButton from "react-linear-gradient-button";
import SubscribedModal from "./components/SubscribedModal";

export default function LandingPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const { openSignIn } = useClerk();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const checkAndCreateUser = async () => {
      if (!userId) {
        console.log("No userId provided.");
        return;
      }

      try {
        console.log(`Checking document for userId: ${userId}`);

        const userDocRef = doc(db, "users", userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(`Document for userId: ${userId} already exists.`);
          setIsSubscribed(getDoc(data.subscribed));
        } else {
          console.log(
            `Document for userId: ${userId} does not exist. Creating document.`
          );
          await setDoc(userDocRef, {
            subscribed: false,
            credits: 2,
          });
          console.log(
            `Document for userId: ${userId} created with subscribed: false and credits: 2.`
          );
        }
      } catch (error) {
        console.error("Error checking or creating user", error);
      }
    };

    checkAndCreateUser();
  }, [userId]);

  const handleSubmit = async () => {
    if (!userId) {
      openSignIn();
      return;
    }

    try {
      const response = await fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const checkoutSessionJson = await response.json();

      if (response.status !== 200) {
        console.error(
          "Error creating checkout session:",
          checkoutSessionJson.error.message
        );
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn("Error redirecting to checkout:", error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  const handleGetStarted = async () => {
    if (!userId) {
      openSignIn();
      return;
    }

    router.push("/dashboard");
  };

  const handleFreeTrialClick = () => {
    if (isSubscribed) {
      handleOpenModal();
    } else {
      handleGetStarted();
    }
  };

  const handleSubscribeClick = () => {
    if (isSubscribed) {
      handleOpenModal();
    } else {
      handleSubmit();
    }
  };
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalClose(false);

  return (
    // <Container maxWidth="lg">
    <Box>
      {/* Hero Section */}
      <Box
        height="680px"
        bgcolor="#e1e3fc"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        my={4}
        // borderRadius={2}
        textAlign="center"
        padding={15}
        sx={{
          backgroundImage: "url(/bg3.jpg)",
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Adjust as needed
          backgroundRepeat: "repeat", // Adjust as needed
          margin: 0,
          padding: 0,
        }}
      >
        <Box display="flex" alignItems="center" mb={5}>
          <Image
            src="/White_Logo.png"
            alt="SmartFlash Logo"
            width={300}
            height={300}
          />
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Quilon-Semibold",
              fontWeight: 600,
              color: "#ffffff",
              ml: { xs: 0, md: -12 }, // Remove or adjust the margin-left for smaller screens
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" }, // Adjust font size based on screen size
              textAlign: { xs: "center", md: "left" }, // Center text on small screens
            }}
          >
            SmartFlash
          </Typography>
        </Box>
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            // color: "#2B2E3A",
            color: "#ffffff",
            letterSpacing: "0.5px",
            lineHeight: "1.2",
            // textTransform: "uppercase",
            // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            mb: 1, // Margin-bottom
          }}
        >
          Flash Forward to Smarter Learning!
        </Typography>

        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{
            fontFamily: "Poppins, sans-serif",
            // fontWeight: "bold",
            // color: "#2B2E3A",
            color: "#ffffff",
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
          {/* <Typography variant="body1" component="p" gutterBottom>
            Join the SmartFlash Revolution!
          </Typography> */}
          <Box mt={2}>
            <GradientButton
              gradient={["#f00b47", "#0f6bb6"]} // Custom gradient colors
              angle="45deg" // Custom angle
              padding={20} // Custom padding
              borderRadius={12} // Custom border radius
              color="#ffffff" // Text color
              fontSize={20} // Font size
              background="linear-gradient(45deg, #f00b47, #0f6bb6)"
              onClick={handleGetStarted} // Add your click handler
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "6px 6px 12px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get Started
            </GradientButton>
          </Box>
        </Box>
      </Box>

      {/* features */}
      <Box height="800px" padding={10}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "Quilon-Regular",
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

      <Container maxWidth="lg" sx={{ my: 8 }}>
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
          mb={10}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/NzLUm9iqMd4?controls=0&modestbranding=1&playsinline=1&autoplay=1&loop=1&playlist=NzLUm9iqMd4"
            title="Flashcard Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Container>

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
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "Quilon-Regular",
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
              <Button
                onClick={handleFreeTrialClick}
                variant="contained"
                color="primary"
                size="large"
              >
                Get Free Trial
              </Button>
              <SubscribedModal
                open={modalOpen}
                onClose={handleCloseModal}
                message="You're already subscribed!"
                onCloseButtonLabel="Close"
              />
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
                onClick={handleSubscribeClick}
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
              <SubscribedModal
                open={modalOpen}
                onClose={handleCloseModal}
                message="You're already subscribed!"
                onCloseButtonLabel="Close"
              />
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
      {/* </Container> */}
    </Box>
  );
}
