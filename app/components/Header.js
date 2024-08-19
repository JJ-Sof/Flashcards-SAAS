import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function Header() {
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
              <Link href="/dashboard" passHref>
                <Button
                  variant="outlined" // Match the variant of the Sign in button
                  color="primary" // Match the color of the Sign in button
                  size="small" // Match the size of the Sign in button
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      borderColor: "primary.dark", // Darker border on hover
                      color: "primary.dark", // Darker text color on hover
                      backgroundColor: "rgba(0, 0, 0, 0.08)", // Light background on hover
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
                  variant="outlined" // Match the variant of the Sign in button
                  color="primary" // Match the color of the Sign in button
                  size="small" // Match the size of the Sign in button
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      borderColor: "primary.dark", // Darker border on hover
                      color: "primary.dark", // Darker text color on hover
                      backgroundColor: "rgba(0, 0, 0, 0.08)", // Light background on hover
                    },
                  }}
                >
                  <Typography variant="caption" sx={{ color: "white" }}>
                    create
                  </Typography>
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      //avatar size
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
            </SignedIn>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
