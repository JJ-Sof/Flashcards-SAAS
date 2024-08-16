"use client";

import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const testimonials = [
  {
    text: "This service is amazing! It really changed the way I approach my work.",
    name: "Alex Morgan",
    stars: 4,
  },
  {
    text: "Incredible experience! Highly recommended for anyone looking to improve their skills.",
    name: "Jordan Lee",
    stars: 5,
  },
  {
    text: "A fantastic tool that delivers on its promises and more!",
    name: "Taylor Bennett",
    stars: 4,
  },
  {
    text: "Exceptional quality and service. Worth every penny.",
    name: "Casey Parker",
    stars: 4,
  },
  {
    text: "A truly innovative solution that exceeded my expectations.",
    name: "Morgan Riley",
    stars: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkBg, setIsDarkBg] = useState(true); // Track the background color

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsDarkBg(!isDarkBg); // Toggle background color
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsDarkBg(!isDarkBg); // Toggle background color
  };

  return (
    <Box
      textAlign="center"
      my={4}
      sx={{
        width: "100%",
        maxWidth: "800px",
        mx: "auto", // Center the box
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mb: 8,
          textAlign: "center",
          fontFamily: "Roboto, sans-serif",
          fontWeight: "bold",
          color: "#1a1d27",
        }}
      >
        Testimonials
      </Typography>

      <Box
        sx={{
          position: "relative",
          padding: 15,
          bgcolor: isDarkBg ? "#2B2E3A" : "#f4f4f9",
          width: "100%",
          maxWidth: "700px",
          mx: "auto",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          height: "300px",
          transition: "none", // Disable transition
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "#3A3F47",
            "&:hover": {
              backgroundColor: "#4A4F57",
            },
            color: "#F0F1FA",
            transition: "none", // Disable transition
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Box
            bgcolor={isDarkBg ? "#2B2E3A" : "#f4f4f9"}
            p={2}
            borderRadius={2}
            width="100%"
            textAlign="center"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "none", // Disable transition
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                color: isDarkBg ? "#F0F1FA" : "#1a1d27",
                letterSpacing: "0.5px",
                lineHeight: "1.8",
                textShadow: isDarkBg
                  ? "2px 2px 4px rgba(0, 0, 0, 0.2)"
                  : "none",
                textAlign: "center",
                p: 2,
                mb: 1,
                transition: "none", // Disable transition
              }}
            >
              {testimonials[currentIndex].text}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                color: isDarkBg ? "#F0F1FA" : "#1a1d27", // Same color as the review text
                letterSpacing: "0.5px",
                lineHeight: "1.5",
                textShadow: isDarkBg
                  ? "2px 2px 4px rgba(0, 0, 0, 0.2)"
                  : "none",
                textAlign: "center",
                transition: "none", // Disable transition
              }}
            >
              - {testimonials[currentIndex].name}
            </Typography>
            <Box mt={1}>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  sx={{
                    color:
                      index < testimonials[currentIndex].stars
                        ? "#FFD700"
                        : "#555",
                    fontSize: "1.5rem",
                    transition: "none", // Disable transition
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "#3A3F47",
            "&:hover": {
              backgroundColor: "#4A4F57",
            },
            color: "#F0F1FA",
            transition: "none", // Disable transition
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
