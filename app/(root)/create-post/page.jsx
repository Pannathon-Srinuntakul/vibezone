"use client";

import { useUser } from "@clerk/nextjs";
import GuestLogin from "@components/form/GuestLogin";
import Posting from "@components/form/Posting";
import { useEffect, useState } from "react";

const CreatePost = () => {
  const { user } = useUser();
  const [clientIp, setClientIp] = useState("");
  const [userData, setUserData] = useState({});
  const [guestData, setGuestData] = useState({});
  const [creatorType, setCreatorType] = useState("")
  
  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setUserData(data);
      setCreatorType("User");
    } catch (error) {
      console.log(error);
    }
  };

  const getGuest = async (ip) => {
    try {
      const response = await fetch(`/api/guest/${ip}`);
      const data = await response.json();
      setGuestData(data);
      setCreatorType("Guest");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    } else {
      fetch("/api/getClientIp")
        .then((response) => response.json())
        .then((data) => {
          setClientIp(data.ip);
          return data.ip;
        })
        .then((ip) => {
          getGuest(ip);
        })
        .catch((error) => console.error("Error fetching IP:", error));
    }
  }, [user]);

  const postData = {
    creatorId: userData?._id || guestData?._id,
    creatorType: creatorType
  };
  
  
  const ipAddress = {
    ip: clientIp,
  };
  
  return (
    <div className="pt-16 px-5 sm:pt-6 flex items-center w-full justify-center">
      {user || guestData ? (
        <Posting post={postData} apiEndpoint={"/api/post/new"} />
      ) : (
        <div className="w-full sm:w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 lg:mt-0 mt-20">
          <GuestLogin clientIp={ipAddress} />
        </div>
      )}
    </div>
  );
};

export default CreatePost;
