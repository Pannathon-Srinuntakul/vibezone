"use client";

import GreenPre from "@components/previewFrame/GreenPre";
import NormalPre from "@components/previewFrame/NormalPre";
import React, { useEffect, useState } from "react";
import { Sriracha } from "next/font/google";
import PurplePre from "@components/previewFrame/PurplePre";
import YellowPre from "@components/previewFrame/YellowPre";
import PinkPre from "@components/previewFrame/PinkPre";
import BluePre from "@components/previewFrame/BluePre";
import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";

const sriracha = Sriracha({ subsets: ["latin"], weight: "400" });

const page = ({ searchParams }) => {
  const { isSignedIn } = useAuth();

  const data = JSON.parse(searchParams.data);
  const userInfo = JSON.parse(searchParams.user)
  
  return data?.creator?._id === userInfo?._id ? (
    <>
      {data.frame === "Blue" && (
        <BluePre
          date={searchParams.date}
          post={data}
          likesCount={data.likes?.length}
          creator={data.creator}
          details={data.details}
          sriracha={sriracha}
        />
      )}
      {data.frame === "Pink" && (
        <PinkPre
          date={searchParams.date}
          post={data}
          likesCount={data.likes?.length}
          creator={data.creator}
          details={data.details}
          sriracha={sriracha}
        />
      )}
      {data.frame === "Yellow" && (
        <YellowPre
          date={searchParams.date}
          post={data}
          likesCount={data.likes?.length}
          creator={data.creator}
          details={data.details}
          sriracha={sriracha}
        />
      )}
      {data.frame === "Purple" && (
        <PurplePre
          date={searchParams.date}
          post={data}
          likesCount={data.likes?.length}
          creator={data.creator}
          details={data.details}
          sriracha={sriracha}
        />
      )}
      {data.frame === "Green" && (
        <GreenPre
          date={searchParams.date}
          post={data}
          likesCount={data.likes?.length}
          creator={data.creator}
          details={data.details}
          sriracha={sriracha}
        />
      )}
      {!data.frame && (
        <NormalPre
          date={searchParams.date}
          post={data}
          likesCount={data.likes?.length}
          creator={data.creator}
          details={data.details}
        />
      )}
    </>
  ) : redirect('/');
};

export default page;
