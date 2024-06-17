"use client";

import { useAuth } from "@clerk/nextjs";
import PricingCard from "@components/cards/PricingCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [prices, setPrices] = useState([]);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const response = await fetch("/api/getProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPrices(data);
  };

  if (!isSignedIn) {
    return <p className="mx-auto text-center mt-20 lg:mt-0">Please login</p>;
  }

  return (
    <div className="w-full lg:w-1/2 bg-white rounded-xl flex flex-col justify-center items-center mt-20 lg:mt-0 ">
      <div className="grid grid-cols-2 grid-rows-4 sm:grid-cols-3 sm:grid-rows-3 lg:grid-cols-2 lg:grid-rows-4 xl:grid-cols-3 xl:grid-rows-3 p-5 gap-8 w-full">
        {prices &&
          prices.map((price) => <PricingCard price={price} key={price.id} />)}
      </div>
        <Link
          href="/policy"
          className="text-tiny-medium text-gray-700 underline pb-3"
          target="_blank"
        >
          Read our policy before purchasing
        </Link>
    </div>
  );
};

export default page;
