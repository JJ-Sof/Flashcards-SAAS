"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Flashcard2 from "../components/Flashcard2";
import { ArrowBack } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@clerk/nextjs";

const FlashcardSetPage = () => {

  const searchParams = useSearchParams();
  const cardSetName = searchParams.get('title');

  const { userId } = useAuth()

  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  useEffect(() => {
    if (!cardSetName || !userId) {
      setLoading(false)
      return;
    }
    let isMounted = true;
    async function fetchCards() {
      try {
        // Reference to the flashcard sets
        const userDocRef = collection(db, "flashcardSets", userId, "sets");
        const existingSetQuery = query(userDocRef, where("title", "==", cardSetName));
        const querySnapshot = await getDocs(existingSetQuery);

        if (querySnapshot.empty) {
          setLoading(false)
          return;
        }

        // Assuming titles are unique, fetch the first matching set
        const setDoc = querySnapshot.docs[0];
        const cardsCollectionRef = collection(db, "flashcardSets", userId, "sets", setDoc.id, "cards");
        const cardsSnapshot = await getDocs(cardsCollectionRef);

        const fetchedCards = cardsSnapshot.docs.map((doc) => doc.data());
        setFlashcards(fetchedCards);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }

    fetchCards();
    return () => {
      isMounted = false; // Set to false on cleanup
    };
  }, [cardSetName, userId]);


  return (
    <Box
      paddingX={"24px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      maxWidth={"1200px"}
      marginX={"auto"}
      sx={{ height: "100vh", justifyContent: "center" }}
    >{loading ? <CircularProgress /> : flashcards.length ?
      <>
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
              {cardSetName}
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
      </> :
      <Typography variant="h5">Set Does Not Exist 🤷</Typography>}

    </Box>
  );
};

export default FlashcardSetPage;
