"use client";

import { useState } from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const testimonials = [
  {
    text: "This service is amazing! It really changed the way I approach my work.",
    name: "Person 1",
    stars: 4
  },
  {
    text: "Incredible experience! Highly recommended for anyone looking to improve their skills.",
    name: "Person 2",
    stars: 5
  },
  {
    text: "A fantastic tool that delivers on its promises and more!",
    name: "Person 3",
    stars: 4
  },
  {
    text: "Exceptional quality and service. Worth every penny.",
    name: "Person 4",
    stars: 4
  },
  {
    text: "A truly innovative solution that exceeded my expectations.",
    name: "Person 5",
    stars: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box
      textAlign="center"
      my={4}
      sx={{ 
        width: '100%', 
        maxWidth: '800px', 
        mx: 'auto', // Center the box
      }}
    >
      <Box
        sx={{
          mb: 4, // Margin-bottom to add space below the heading
          p: 2, // Padding around the heading
          border: '1px solid #ddd', // Light border
          borderRadius: '8px', // Rounded corners
          backgroundColor: '#f9f9f9' // Light background color
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Testimonials
        </Typography>
      </Box>
      <Box
        height={60}
      >
      </Box>

      <Box
        bgcolor="grey.200"
        display="flex"
        alignItems="center"
        borderRadius={2}
        overflow="hidden"
        position="relative"
        width="100%"
        maxWidth="600px"
        mx="auto" // Center the box
      >
        <IconButton
          onClick={handlePrev}
          sx={{ position: 'absolute', left: 0, zIndex: 1 }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Box
          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
        >
          <Box
            bgcolor="white"
            p={2}
            borderRadius={2}
            width="100%"
            textAlign="center"
          >
            <Typography variant="body1" mb={1}>
              {testimonials[currentIndex].text}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              - {testimonials[currentIndex].name}
            </Typography>
            <Box mt={1}>
              {[...Array(5)].map((_, index) => (
                <StarIcon key={index} color={index < testimonials[currentIndex].stars ? "primary" : "disabled"} />
              ))}
            </Box>
          </Box>
        </Box>
        <IconButton
          onClick={handleNext}
          sx={{ position: 'absolute', right: 0, zIndex: 1 }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
