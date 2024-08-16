"use client";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Flashcard from "app/components/Flashcard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import SaveModal from "../components/SaveModal";
import { Bounce, toast } from "react-toastify";

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
        } catch (error) {
          reject(error);
        }
      }),
      {
        pending: "Generating new set...",
        success: "Generated successfully",
        error: "Failed to generate",
      },
      {
        position: "top-center",
        theme: "dark",
      }
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
        <IconButton
          onClick={() => {
            router.replace("/dashboard");
          }}
        >
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
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
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
          // backgroundColor: "gray",
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
    </Box>
  );
};

export default page;
