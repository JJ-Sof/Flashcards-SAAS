"use client";
import React, { useState } from "react";
import { Card, Typography } from "@mui/material";
import ReactCardFlip from "react-card-flip";

const Flashcard2 = ({ cardObj }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const cardStyle = {
    padding: "30px",
    height: "400px",
    width: "700px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
  };

  if (!cardObj) return null; // Handle case when cardObj is not passed

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <Card sx={cardStyle} elevation={20} onClick={handleFlip}>
        <Typography variant="h6" fontWeight={"bold"}>
          {cardObj.front}
        </Typography>
        <Typography fontSize={12} fontWeight={"light"}>
          [Front]
        </Typography>
      </Card>
      <Card sx={cardStyle} elevation={20} onClick={handleFlip}>
        <Typography variant="h6">{cardObj.back}</Typography>
        <Typography fontSize={12} fontWeight={"light"}>
          [Back]
        </Typography>
      </Card>
    </ReactCardFlip>
  );
};

export default Flashcard2;
