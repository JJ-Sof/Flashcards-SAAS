import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const creators = [
  {
    id: 1,
    name: "Apurva Honrao",
    imageSrc: "/apurva.jpg",
    linkedinUrl: "https://www.linkedin.com/in/apurva-honrao/",
  },
  {
    id: 2,
    name: "Abdelrahman Hany",
    imageSrc: "/abdu.jpg",
    linkedinUrl: "https://www.linkedin.com/in/abduhany/",
  },
  {
    id: 3,
    name: "Creator 3",
    imageSrc: "/creator1.jpg",
    linkedinUrl: "https://linkedin.com/in/creator3",
  },
];

const MeetTheCreators = () => {
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
          fontFamily: "Roboto, sans-serif",
          fontWeight: "bold",
          color: "#1a1d27",
          textAlign: "center",
          mb: 10,
        }}
      >
        Meet The Creators!
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {creators.map((creator) => (
          <Grid item xs={12} sm={6} md={4} key={creator.id}>
            <Box
              sx={{
                height: "100px",
                width: "100px",
                bgcolor: "grey.200",
                borderRadius: "50%",
                overflow: "hidden", // Hide overflow to ensure image is round
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mx: "auto",
                mb: 2,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Image
                src={creator.imageSrc}
                alt={`Creator ${creator.id}`}
                width={100}
                height={100}
                style={{
                  objectFit: "cover", // Ensures the image covers the container
                }}
              />
            </Box>
            <Typography
              variant="subtitle1"
              mt={1}
              fontWeight="medium"
              sx={{
                color: "#333",
                transition: "color 0.3s ease, text-decoration 0.3s ease",
                "&:hover": {
                  color: "#0d47a1",
                  textDecoration: "underline",
                },
              }}
            >
              {creator.name}
            </Typography>
            <a
              href={creator.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "#03468a", // LinkedIn color
                transition: "color 0.3s ease, transform 0.3s ease",
                marginTop: "0.5rem",
                "&:hover": {
                  color: "#004182",
                  transform: "scale(1.2)",
                },
              }}
            >
              <LinkedInIcon />
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MeetTheCreators;
