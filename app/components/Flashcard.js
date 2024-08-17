"use client";
import { BorderAllOutlined } from "@mui/icons-material";
import { Box, Card, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const Flashcard = ({ cardObj }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const cardStyle = {
    padding: "30px",
    height: "200px", // Set a fixed height
    width: "300px", // Set a fixed width
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center", // Center text inside the card
    flexDirection: "column",
    // border: '2px dashed black',
  };

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <Card sx={cardStyle} elevation={20} onClick={handleFlip}>
        <Typography flex={1} variant="h6" fontWeight={"bold"}>
          {cardObj.front}
        </Typography>
        <Typography fontSize={12} fontWeight={"light"}>
          [Front]
        </Typography>
      </Card>

      <Card sx={cardStyle} elevation={20} onClick={handleFlip}>
        <Typography flex={1} variant="h7">
          {cardObj.back}
        </Typography>
        <Typography fontSize={12} fontWeight={"light"}>
          [Back]
        </Typography>
      </Card>
    </ReactCardFlip>
  );
};

export default Flashcard;
