"use client";

import { useState } from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
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
      <Box
        sx={{
          mb: 15,
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
            mb: 1,
            textAlign: "center",
            transition: "color 0.3s ease, text-shadow 0.3s ease",
            "&:hover": {
              color: "#0d47a1",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Testimonials
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          bgcolor: "#2B2E3A",
          width: "100%",
          maxWidth: "600px",
          mx: "auto",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          height: "300px",
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "#3A3F47",
            "&:hover": {
              backgroundColor: "#4A4F57",
            },
            color: "#F0F1FA",
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
            bgcolor="#2B2E3A"
            p={2}
            borderRadius={2}
            width="100%"
            textAlign="center"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
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
                mb: 1,
              }}
            >
              {testimonials[currentIndex].text}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                color: "#FFD700",
                letterSpacing: "0.5px",
                lineHeight: "1.5",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
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
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "#3A3F47",
            "&:hover": {
              backgroundColor: "#4A4F57",
            },
            color: "#F0F1FA",
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
