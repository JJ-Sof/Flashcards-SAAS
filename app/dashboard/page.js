"use client";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import HomeIcon from "@mui/icons-material/Home";

const Dashboard = () => {
  const { userId } = useAuth();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const router = useRouter();

  const fetchFlashcardSets = async () => {
    if (!userId) return;
    try {
      const userDocRef = collection(db, "flashcardSets", userId, "sets");
      const setsSnapshot = await getDocs(userDocRef);

      const sets = await Promise.all(
        setsSnapshot.docs.map(async (setDoc) => {
          const setData = setDoc.data();
          const cardsCollectionRef = collection(
            db,
            "flashcardSets",
            userId,
            "sets",
            setDoc.id,
            "cards"
          );
          const cardsSnapshot = await getDocs(cardsCollectionRef);
          const cards = cardsSnapshot.docs.map((cardDoc) => cardDoc.data());

          return {
            id: setDoc.id,
            title: setData.title,
            cards: cards,
          };
        })
      );
      setFlashcardSets(sets);
    } catch (error) {
      console.error("Error fetching flashcard sets:", error);
    }
  };

  useEffect(() => {
    fetchFlashcardSets();
  }, [userId]);

  const handleCreate = () => {
    router.push("/generate");
  };

  return (
    <Box sx={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <IconButton
        onClick={() => {
          router.push("/"); // Redirects to the home page
        }}
      >
        <HomeIcon />
      </IconButton>
      <Box
        sx={{
          padding: "2px",
          alignItems: "left",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "2.5rem",
          }}
        >
          Your Flashcard Sets
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{
            padding: "6px 16px",
            alignSelf: "center",
            backgroundColor: "coral",
          }}
        >
          +create
        </Button>
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: flashcardSets.length ? "flex-start" : "center",
            alignItems: flashcardSets.length ? "flex-start" : "center",
            minHeight: flashcardSets.length ? "auto" : "300px",
            backgroundColor: flashcardSets.length ? "none" : "#f0f0f0",
            borderRadius: "8px",
            padding: flashcardSets.length ? "0" : "20px",
          }}
        >
          {flashcardSets.length ? (
            flashcardSets.map((set) => (
              <Paper
                key={set.id}
                elevation={6}
                sx={{
                  width: "250px",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    backgroundColor: "#f1f1f1",
                  },
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {set.title}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{
                color: "#888",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Create your Flashcard set to see them here!
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
