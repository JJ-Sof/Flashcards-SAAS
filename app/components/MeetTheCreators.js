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
    name: "Creator 2",
    imageSrc: "/creator1.jpg",
    linkedinUrl: "https://linkedin.com/in/creator2",
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
            mb: 3,
            textAlign: "center",
            transition: "color 0.3s ease, text-shadow 0.3s ease",
            "&:hover": {
              color: "#0d47a1",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Meet the Creators!
        </Typography>
      </Box>

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
