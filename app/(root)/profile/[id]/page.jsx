"use client";

import { useUser } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";
import ProfileCard from "@components/cards/ProfileCard";
import Loader from "@components/Loader";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const profile = () => {
  const { user, isLoaded } = useUser();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [loggedInUserData, setLoggedInUserData] = useState()
  const router = useRouter();

  const getUserProfile = async () => {
    const response = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    data?.posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setUserData(data);
    setLoading(false);
  };

  const getLoggedInUser = async () => {
    if (user) {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setLoggedInUserData(data);
    }
  };
  
  const updateUser = async () => {
    if (userData.clerkId) {
      const response = await fetch(`/api/user/${userData.clerkId}`);
      const data = await response.json();
      setUserData(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isLoaded) {
        if (user) {
          await getLoggedInUser();
        }
        await getUserProfile();
      }
    };

    fetchData();
  }, [isLoaded, user, id]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {userData ? (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center">
            <div className="w-full lg:w-1/2 rounded-xl drop-shadow-lg p-5 bg-white">
              <ProfileCard userData={userData} />
            </div>
          </div>
          <div className="flex flex-col gap-9 mt-12">
            {userData.posts?.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                creator={post.creator}
                loggedInUser={loggedInUserData}
                update={getUserProfile}
                updateUser={updateUser}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No User</p>
      )}
    </>
  );
};

export default profile;
