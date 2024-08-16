"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";

import {
  CircularProgress,
  Typography,
  Box,
  Container,
  Paper,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
          setMessage(
            sessionData.payment_status === "paid"
              ? "Thank you for purchasing!"
              : "Payment failed. Please try again."
          );
        } else {
          setError(sessionData.error || "An error occurred");
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ position: "relative", mt: 4 }}>
      <Button
        variant="container"
        padding="8px 16px"
        onClick={() => {
          router.push("/"); // Redirects to the home page
        }}
        sx={{
          mb: 2,
        }}
      >
        Home
      </Button>
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          {message || "Session result"}
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {session ? (
            <>
              <IconButton
                sx={{
                  color: session.payment_status === "paid" ? "green" : "red",
                  mb: 1,
                }}
                disabled
              >
                {session.payment_status === "paid" ? (
                  <CheckCircleOutlineIcon fontSize="large" />
                ) : (
                  <ErrorOutlineIcon fontSize="large" />
                )}
              </IconButton>
              <Typography variant="h6">Session ID: {session_id}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {session.payment_status === "paid"
                  ? "We have received your payment. An email will be sent to you with details soon."
                  : "An error occurred, and your payment was not successful. Please try again or contact support."}
              </Typography>
            </>
          ) : (
            <>
              <IconButton sx={{ color: "red", mb: 1 }} disabled>
                <ErrorOutlineIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6">Session ID: {session_id}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {error}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ResultPage;
