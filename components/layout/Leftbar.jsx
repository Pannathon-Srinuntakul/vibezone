"use client";

import { UserButton, SignedIn, SignOutButton } from "@clerk/nextjs";
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


  
  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  if(!user) return (
    <div className="leftbar items-center">
      <Link href="/sign-in" className="mt-36 "><p className="text-heading4-bold flex gap-3"><Login />Sign in</p></Link>
    </div>
  )
  console.log(userData)

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="leftbar">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-subtext">
          <Link
            href="/"
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
            <p className="text-center text-body-normal mt-2">{userData?.firstName} {userData?.lastName}</p>
          </Link>
            <p className="text-subtle-medium text-light-2">{userData?.username}</p>
        </div>
        <div className="flex text-subtext justify-around">
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.posts.length}</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.savedPosts.length}</p>
            <p className="text-tiny-medium">Saved posts</p>
          </div>
        </div>

        <hr />
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            <UserButton afterSignOutUrl="/sign-in" />
            <p className="text-subtext text-small-bold">Manage Account</p>
          </div>
  
        <div className="flex items-center gap-4">
          <Image 
            src="/assets/coin.svg"
            width={30}
            height={30}
            alt="credit"
          />
          <p className="text-subtext text-small-semibold">{userData?.credit}</p>
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
