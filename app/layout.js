import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
import MuiThemeProvider from "./theme";
import Footer from "./components/Footer";
import { Box, CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Script from "next/script";

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
          {/* Google Analytics script */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-SYDV0ZCFQL"
          />
          <Script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-SYDV0ZCFQL');
              `,
            }}
          />
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
