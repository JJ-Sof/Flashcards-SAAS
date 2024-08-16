"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Flashcard2 from "../components/Flashcard2";
import { ArrowBack } from "@mui/icons-material";

const FlashcardSetPage = () => {
  const [flashcards, setFlashcards] = useState([
    { front: "Front 1", back: "Back 1" },
    { front: "Front 2", back: "Back 2" },
    { front: "Front 3", back: "Back 3" },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  return (
    <Box
      paddingX={"24px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      maxWidth={"1200px"}
      marginX={"auto"}
      sx={{ height: "100vh", justifyContent: "center" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <IconButton onClick={() => window.history.back()}>
          <ArrowBack />
        </IconButton>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              padding: "10px 20px",
              textAlign: "center",
              width: "100%",
            }}
          >
            Flashcard Set Name
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <IconButton
          onClick={handlePrevious}
          aria-label="previous flashcard"
          sx={{ position: "absolute", left: 0, zIndex: 1 }}
        >
          <ArrowBackIos />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "900px",
            height: "500px",
            mb: "1px",
          }}
        >
          <Flashcard2 cardObj={flashcards[currentIndex]} />
        </Box>

        <IconButton
          onClick={handleNext}
          aria-label="next flashcard"
          sx={{ position: "absolute", right: 0, zIndex: 1 }}
        >
          <ArrowForwardIos />
        </IconButton>

        <Typography
          variant="caption"
          sx={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          {currentIndex + 1}/{flashcards.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default FlashcardSetPage;
