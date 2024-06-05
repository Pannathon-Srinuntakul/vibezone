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
         <div className="grid grid-cols-2 grid-rows-4 sm:grid-cols-3 sm:grid-rows-3 lg:grid-cols-2 lg:grid-rows-4 xl:grid-cols-3 xl:grid-rows-3 p-5 mt-20 lg:mt-0 gap-8 w-full">
           {prices && prices.map((price) => (
            <PricingCard price={price} key={price.id} />
           ))}
         </div>
   </div>
  );
};

export default page;
