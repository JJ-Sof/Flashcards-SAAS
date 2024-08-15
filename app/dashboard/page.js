// app/dashboard/page.js
"use client";
import { Box, Typography, Button } from "@mui/material";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const Dashboard = () => {
  const { userId } = useAuth();
  console.log(userId);
  const [flashcardSets, setFlashcardSets] = useState([]);

  const fetchFlashcardSets = async () => {
    if (!userId) return;
    try {
      console.log(userId);
      const collectionRef = collection(db, "flashcardSets");
      const q = query(collectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const sets = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const setData = doc.data();
          const cardsCollection = collection(
            db,
            `flashcardSets/${doc.id}/cards`
          );
          const cardsSnapshot = await getDocs(cardsCollection);
          const cards = cardsSnapshot.docs.map((cardDoc) => cardDoc.data());
          return {
            id: doc.id,
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

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        Created Flashcard Sets
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: flashcardSets.length ? "flex-start" : "center",
          alignItems: flashcardSets.length ? "flex-start" : "center",
          height: flashcardSets.length ? "auto" : "200px",
          backgroundColor: flashcardSets.length ? "none" : "#f0f0f0",
          borderRadius: "8px",
          padding: flashcardSets.length ? "0" : "20px",
        }}
      >
        {flashcardSets.length ? (
          flashcardSets.map((set) => (
            <Button
              key={set.id}
              variant="outlined"
              sx={{
                width: "200px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                textTransform: "capitalize",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              {set.title}
            </Button>
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
            Empty
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
