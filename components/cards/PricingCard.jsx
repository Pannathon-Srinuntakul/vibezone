"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PricingCard = ({ price }) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!isLoaded || !user) return;
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe not loaded correctly");
      return;
    }
  
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId: price.id, userId: user.id }),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };
  return (
    <div className="bg-white p-5 flex flex-col items-center justify-center gap-5 rounded-2xl drop-shadow-xl">
      <div className="w-5/6">
        <Image
          src="/assets/coin.svg"
          width={100}
          height={100}
          layout="responsive"
          alt="coin"
        />
      </div>
      <p className="text-center text-small-semibold">
        {price.metadata.productName} Credits
      </p>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-small-bold">
          {(price.unit_amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "THB",
          })}
        </h1>
      </div>
      <button
        className="flex w-5/6 justify-center rounded-xl bg-[#f1592a] py-2 px-4 text-small-semibold font-medium text-white shadow-sm"
        onClick={handleSubscription}
      >
        Buy now
      </button>
    </div>
  );
};

export default PricingCard;
