import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
import MuiThemeProvider from "./theme";
import Footer from "./components/Footer";
import { Box, CssBaseline } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartFlash",
  description: "AI Flashcard Generator",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastContainer />
          <MuiThemeProvider>
            <CssBaseline />
            <Box display="flex" flexDirection="column" minHeight="100vh">
              <Header />
              <Box component="main" flexGrow={1}>
                {children}
              </Box>
              <Footer />
            </Box>
          </MuiThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
