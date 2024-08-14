import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <Box
      sx={{
        padding: "10px",
        display: "flex",
        height: "60px",
        backgroundColor: "lightblue",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          flex: 1,
        }}
      >
        Logo
      </Typography>
      <SignedOut>
        <SignInButton mode="modal">
          <Button size="small" variant="contained">
            Login/Signup
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
        </Box>
      </SignedIn>
    </Box>
  );
};

export default Header;
