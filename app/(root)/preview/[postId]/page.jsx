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
import BlackPre from "@components/previewFrame/BlackPre";
import PridePre from "@components/previewFrame/PridePre";

const sriracha = Sriracha({ subsets: ["latin"], weight: "400" });

const page = ({ searchParams }) => {
  const { user } = useUser();
  const [data, setData] = useState({});
  const { isSignedIn } = useAuth();

  const getPost = async () => {
    const response = await fetch(`/api/post/${searchParams.post}`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!isSignedIn) {
    return <p className="mt-16 lg:mt-0">Please sign in</p>;
  }

  return data?.creator?.clerkId === user.id ? (
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
      {data.frame === "Black" && (
        <BlackPre
          date={searchParams.date}
          post={data}
          likesCount={data.likes?.length}
          creator={data.creator}
          details={data.details}
          sriracha={sriracha}
        />
      )}
      {data.frame === "Pride" && (
        <PridePre
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
  ) : <p className="mt-16 lg:mt-0">Unauthorized</p>;
};

export default page;
