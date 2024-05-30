"use client";

import { useUser } from "@clerk/nextjs";
import GuestLogin from "@components/form/GuestLogin";
import Posting from "@components/form/Posting";
import Loader from "@components/Loader";
import { useEffect, useState } from "react";

const CreatePost = () => {
  const { user, isLoaded } = useUser();
  const [clientIp, setClientIp] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [guestData, setGuestData] = useState({});
  const [creatorType, setCreatorType] = useState("")
  
  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setUserData(data);
      setCreatorType("User");
      setLoading(false);
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
    <div className="pt-6 flex items-center w-full justify-center">
      {user || guestData ? (
        <Posting post={postData} apiEndpoint={"/api/post/new"} />
      ) : (
        <div className="w-[300px] sm:w-[500px]">
          <GuestLogin clientIp={ipAddress} />
        </div>
      )}
    </div>
  );
};

export default CreatePost;
