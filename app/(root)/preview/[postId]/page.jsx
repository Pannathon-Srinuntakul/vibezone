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
import CloudPre from "@components/previewFrame/CloudPre";
import CoffeePre from "@components/previewFrame/CoffeePre";
import BunnyPre from "@components/previewFrame/BunnyPre";
import FluffyPre from "@components/previewFrame/FluffyPre";

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

  if (data?.creator?.clerkId !== user.id) {
    return <p className="mt-16 lg:mt-0">Unauthorized</p>;
  }

  let FramePreComponent;

  switch (data.frame) {
    case "Blue":
      FramePreComponent = BluePre;
      break;
    case "Pink":
      FramePreComponent = PinkPre;
      break;
    case "Yellow":
      FramePreComponent = YellowPre;
      break;
    case "Purple":
      FramePreComponent = PurplePre;
      break;
    case "Green":
      FramePreComponent = GreenPre;
      break;
    case "Black":
      FramePreComponent = BlackPre;
      break;
    case "Pride":
      FramePreComponent = PridePre;
      break;
    case "Cloud":
      FramePreComponent = CloudPre;
      break;
    case "Coffee":
      FramePreComponent = CoffeePre;
      break;
    case "Bunny":
      FramePreComponent = BunnyPre;
      break;
    case "Fluffy":
      FramePreComponent = FluffyPre;
      break;
    default:
      FramePreComponent = NormalPre;
      break;
  }

  return (
    <FramePreComponent
      date={searchParams.date}
      post={data}
      likesCount={data.likes?.length}
      creator={data.creator}
      details={data.details}
      sriracha={sriracha}
    />
  );
};

export default page;
