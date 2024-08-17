// api/checkout_session.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    const clerkUserId = checkoutSession.metadata.clerkUserId;
    const paymentStatus = checkoutSession.payment_status;

    if (clerkUserId && paymentStatus === "paid") {
      const userDocRef = doc(db, "users", clerkUserId);
      await updateDoc(userDocRef, { subscribed: true });
    }

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error("Error retrieving session checkout:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json(
      { error: { message: "User ID is required" } },
      { status: 400 }
    );
  }

  const params = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Pro-Subscription",
          },
          unit_amount: formatAmountForStripe(10),
          recurring: {
            interval: "month",
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get(
      "origin"
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      "origin"
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      clerkUserId: userId,
    },
  };

  try {
    const checkoutSession = await stripe.checkout.sessions.create(params);

    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, { subscribed: false });

    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}
