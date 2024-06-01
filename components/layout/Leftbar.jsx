"use client";

import { UserButton, SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import { Login, Logout, Menu } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";

const Leftbar = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const { userId } = useAuth();

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);
  
  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };


  if (!user)
    return (
      <div className="leftbar items-center">
        <Link href="/sign-in" className="mt-36 ">
          <p className="text-heading4-bold flex gap-3">
            <Login />
            Sign in
          </p>
        </Link>
      </div>
    );

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="leftbar">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center">
          <Link
            href={`/profile/${userId}`}
            className="flex flex-col items-center justify-between gap-2 w-full"
          >
            <div className="relative w-[60px] h-[60px]">
              <Image
                src={userData?.profilePhoto}
                alt="profile photo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-center text-body-normal mt-2">
              {userData?.firstName} {userData?.lastName}
            </p>
          </Link>
          <p className="text-subtle-medium text-light-2">
            {userData?.username}
          </p>
          <p className="text-small-semibold">
            {userData?.bio}
          </p>
        </div>
        <hr />
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            <UserButton afterSignOutUrl="/sign-in" />
            <p className="text-subtext text-small-bold">Manage Account</p>
          </div>

          <div className="flex items-center gap-4 justify-between">
            <Image src="/assets/coin.svg" width={30} height={30} alt="credit" />
            <p className="text-subtext text-small-semibold">
              {userData?.credit}
            </p>
            <div className="relative">
            <a href="/credit">+</a>
            </div>
          </div>
          <hr />
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
