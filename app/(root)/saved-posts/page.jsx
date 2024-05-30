"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";
import PostCard from "@components/cards/PostCard";
import React, { useEffect } from "react";
import { useState } from "react";

const SavedPosts = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    data.savedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setUserData(data);
    setLoading(false);
  };

  const updateUser = async () => {
    if (user) {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setUserData(data);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  if (userData && Object.keys(userData).length > 0) {
    return loading || !isLoaded ? (
      <Loader />
    ) : (
      <div className="flex flex-col w-full items-center gap-10">
        {userData?.savedPosts?.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            creator={post.creator}
            loggedInUser={userData}
            update={getUser}
            updateUser={updateUser}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default SavedPosts;
