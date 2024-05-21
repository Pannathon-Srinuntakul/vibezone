"use client"

import { UserButton, SignedIn, SignOutButton } from "@clerk/nextjs";
import { Logout, Menu } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const Leftbar = () => {

  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`)
    const data = await response.json()
    setUserData(data)
    setLoading(false)
  }

  useEffect(()=> {
    if (isLoaded){

      getUser()
    }
  },[user])
console.log(userData)
  
  return (
    <div className="leftbar border">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center text-subtext">
          <Link
            href="/"
            className="flex flex-col items-center justify-between gap-3"
          >
            <div className="relative w-[40px] h-[40px]">
              <Image
                src="/assets/beach.jpg"
                alt="profile photo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-body-normal">Pannathon Srinuntakul</p>
          </Link>
        </div>
        <div className="flex text-subtext justify-around">
          <div className="flex flex-col items-center">
            <p className="text-base-bold">5</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">10</p>
            <p className="text-tiny-medium">Saved posts</p>
          </div>
        </div>

        <hr />
        <div className="flex flex-col gap-12">
          <div className="flex gap-4 items-center">
            <UserButton afterSignOutUrl="/sign-in" />
            <p className="text-subtext text-small-bold">Manage Account</p>
          </div>

          <SignedIn>
            <SignOutButton redirectUrl="/sign-in">
              <div className="flex cursor-pointer gap-4 items-center">
                <Logout sx={{ color: "subtext", fontSize: "32px" }} />
                <p className="text-small-bold text-subtext">Log out</p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
