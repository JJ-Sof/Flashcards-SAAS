'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { Box, Button, Container, Typography } from "@mui/material";

export default function Home() {
  const handleSubmit = async() => {
    const checkoutSession = await fetch('api/checkout_session', {
      method: 'POST',
      headers: {
        origin: "http/localhost:3000",
      },
    })
    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error){
      console.warn(error.message)
    }
  }
  return (
    <Box>
      <Typography>10 $ a month sub</Typography>
      <Button onClick={handleSubmit}>Sub</Button>
    </Box>
  );
}
