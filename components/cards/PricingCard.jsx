"use client"

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const PricingCard = ({price}) => {
    const {user, isLoaded} = useUser()

    const handleSubscription = async (e) => {
        e.preventDefault();
        if (!isLoaded || !user) return;
        
        const response = await fetch('/api/payment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ priceId: price.id, userId: user.id }),
        })
        const data = await response.json()
        window.open(data, '_blank')
    }
  return (
    <div className="bg-white p-5 flex flex-col items-center justify-center gap-5 rounded-2xl drop-shadow-xl">
      <div className='w-5/6'>
        <Image
          src='/assets/coin.svg'
          width={100}
          height={100}
          layout='responsive'
        />
      </div>
      <p className='text-center text-small-semibold'>{price.metadata.productName} Credits</p>
          <div className="flex flex-col items-center justify-center">
              <h1 className="text-small-bold"> 
              {(price.unit_amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'THB'
              })}
              </h1>
          </div>
        <button className="flex w-5/6 justify-center rounded-xl bg-[#f1592a] py-2 px-4 text-small-semibold font-medium text-white shadow-sm" onClick={handleSubscription}>
             Buy now
          </button>
    </div>
  )
}

export default PricingCard