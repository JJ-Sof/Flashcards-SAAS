import React from "react";
import { Box, Button, Container } from "@mui/material";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <Box bgcolor="grey.100" py={2} boxShadow={1}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Logo Section */}
          <Box>
            <Image src="/logo.png" alt="Your Logo" width={120} height={40} />
          </Box>

          {/* Authentication Buttons */}
          <Box display="flex" alignItems="center" gap={2}>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outlined" color="primary">
                  Sign in / Sign up
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "lightcoral",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                }}
              >
                + Create
              </Button>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: 32,
                      height: 32,
                    },
                    userButtonText: {
                      display: "block",
                      marginLeft: "8px",
                      fontWeight: "bold",
                      fontSize: "14px",
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
