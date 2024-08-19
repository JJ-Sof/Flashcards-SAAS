"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useUser,
  useAuth,
} from "@clerk/nextjs";
import Image from "next/image";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import getStripe from "utils/get-stripe";

export default function Header() {
  const { userId } = useAuth();
  const { user } = useUser();
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setSubscribed(userDoc.data().subscribed || false);
        }
      }
    };

    fetchSubscriptionStatus();
  }, [user]);

  const handleSubscribe = async () => {
    if (!userId) {
      openSignIn();
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

  const handleUnsubscribe = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.id);
      const userDoc = await getDoc(userDocRef);
      const { subscriptionId } = userDoc.data();

      if (subscriptionId) {
        await fetch("/api/checkout_session", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });

        setSubscribed(false);
      }
    }
  };

  return (
    <Box
      bgcolor="#2B2E3A"
      py={1}
      boxShadow={3}
      position="sticky"
      top={0}
      width="100%"
      zIndex={1000}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height={40}
        >
          {/* Logo Section */}
          <Box>
            <Link href="/">
              <Image
                src="/White_Logo.png"
                alt="SmartFlash Logo"
                width={40}
                height={40}
              />
            </Link>
          </Box>

          {/* Authentication Buttons */}
          <Box display="flex" alignItems="center" gap={1}>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outlined" color="primary" size="small">
                  Sign in
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Box display="flex" alignItems="center" gap={1}>
                {subscribed ? (
                  <Button
                    onClick={handleUnsubscribe}
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "&:hover": {
                        borderColor: "primary.dark",
                        color: "primary.dark",
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    }}
                  >
                    Unsubscribe
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubscribe}
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "&:hover": {
                        borderColor: "primary.dark",
                        color: "primary.dark",
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    }}
                  >
                    Subscribe
                  </Button>
                )}
                <Link href="/dashboard" passHref>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "&:hover": {
                        borderColor: "primary.dark",
                        color: "primary.dark",
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "white" }}>
                      Dashboard
                    </Typography>
                  </Button>
                </Link>
                <Link href="/generate" passHref>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "&:hover": {
                        borderColor: "primary.dark",
                        color: "primary.dark",
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "white" }}>
                      Create
                    </Typography>
                  </Button>
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: 35,
                        height: 35,
                      },
                      userButtonText: {
                        display: "block",
                        marginLeft: "4px",
                        fontWeight: "bold",
                        fontSize: "12px",
                      },
                    },
                  }}
                />
              </Box>
            </SignedIn>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
