"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    background: {
      default: "#e1e3fc", // Background color for the entire app
    },
    text: {
      primary: "#000000", // Primary text color
    },
    primary: {
      main: "#2B2E3A", // Primary button color
    },
    secondary: {
      main: "#E4E6EF", // Secondary button color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Default button color
          backgroundColor: "#2B2E3A",
          color: "#E4E6EF",
          "&:hover": {
            backgroundColor: "#1a1d27", // Darker shade on hover for primary
          },
        },
      },
    },
  },
});

export default function MuiThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
