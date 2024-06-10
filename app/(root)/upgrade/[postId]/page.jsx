"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import PurchaseCard from "@components/cards/PurchaseCard";
import Loader from "@components/Loader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user, isLoaded } = useUser();
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [userData, setUserData] = useState();
  const { isSignedIn } = useAuth();

  const getUser = async () => {
    const response = await fetch(`/api/user/${user?.id}`);
    const data = await response.json();
    setUserData(data);
  };

  const getUserPost = async () => {
    try {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getUserPost();
  }, []);

  if (!isSignedIn) {
    return <p className="mx-auto text-center mt-20 lg:mt-0">Please login</p>
  }
  
  return !isLoaded ? (
    <Loader />
  ) : post?.creator?.clerkId === user?.id ? (
    <div className="w-full flex flex-col justify-center items-center">
      <PurchaseCard postId={postId} user={userData} />
    </div>
  ) : null;
};

export default page;
