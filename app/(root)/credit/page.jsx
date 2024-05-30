"use client";

import PricingCard from "@components/cards/PricingCard";
import React, { useEffect, useState } from "react";

const page = () => {
  const [prices, setPrices] = useState([]);

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

  return (
    <div className="w-full lg:w-1/2">
         <div className="flex gap-20 w-full">
           {prices && prices.map((price) => (
            <PricingCard price={price} key={price.id} />
           ))}
         </div>
   </div>
  );
};

export default page;
