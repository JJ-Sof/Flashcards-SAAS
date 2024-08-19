"use client";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import Flashcard from "app/components/Flashcard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import SaveModal from "../components/SaveModal";
import { Bounce, toast } from "react-toastify";
import getStripe from "utils/get-stripe";

const page = () => {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Perform any necessary redirects or navigation here
    if (!userId) {
      router.push("/");
    }
    console.log(userId);
  }, [router, userId]);

  const [prompt, setPrompt] = useState("");
  const [cardSet, setCardSet] = useState([]);
  const [buttonText, setButtonText] = useState("✨Generate✨");
  const [openModal, setOpenModal] = useState(false);

  const handleGenerate = async () => {
    if (prompt.length === 0) {
      toast.error("Please enter a prompt", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    const toastId = toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const { credits, subscribed } = userData;

            if (subscribed) {
              const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
              });

              const data = await response.json();
              setCardSet(data);
              setButtonText("✨Generate Again✨");
              setPrompt("");
              resolve(data);
            } else if (credits > 0) {
              await updateDoc(userDocRef, {
                credits: credits - 1,
              });

              const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
              });

              const data = await response.json();
              setCardSet(data);
              setButtonText("✨Generate Again✨");
              setPrompt("");
              resolve(data);
            } else {
              setOpenModal(true);
              reject(new Error("Insufficient credits"));
            }
          } else {
            reject(new Error("User data not found"));
          }
        } catch (error) {
          reject(error);
        }
      }),
      {
        pending: "Generating new set...",
        success: "Generated successfully",
        error: {
          render({ data }) {
            return data?.message || "Failed to generate";
          },
        },
      },
      {
        position: "top-center",
        theme: "dark",
      }
    );
  };

  const handleSubmit = async () => {
    if (!userId) {
      return;
    }

    try {
      const response = await fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const checkoutSessionJson = await response.json();

      if (response.status !== 200) {
        console.error(
          "Error creating checkout session:",
          checkoutSessionJson.error.message
        );
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn("Error redirecting to checkout:", error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  return (
    <Box
      paddingX={"24px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      maxWidth={"1200px"}
      marginX={"auto"}
    >
      <Box
        marginBottom={"30px"}
        sx={{
          marginY: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => router.replace("/dashboard")}>
          <ArrowBack />
        </IconButton>
        <Typography textAlign={"center"} variant="h4" flex={1}>
          Generate New Set
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <TextField
          label="Prompt..."
          multiline
          fullWidth
          size="medium"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button variant="contained" size="small" onClick={handleGenerate}>
          {buttonText}
        </Button>
      </Box>
      <Box
        sx={{
          padding: "24px",
          marginY: "30px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {cardSet.length === 0 ? (
          "Generate a new set to get started!"
        ) : (
          <>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"center"}
              gap={"20px"}
            >
              {cardSet.map((card, index) => (
                <Flashcard cardObj={card} key={index} />
              ))}
            </Box>
            <SaveModal userId={userId} cardSet={cardSet} />
          </>
        )}
      </Box>

      {/* Subscription Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            You've run out of free tries!
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Subscribe to our Pro plan for unlimited access to flashcard
            generation.
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
            Pro Subscription
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default page;
