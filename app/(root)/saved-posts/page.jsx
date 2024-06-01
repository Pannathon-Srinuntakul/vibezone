"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";
import PostCard from "@components/cards/PostCard";
import React, { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const SavedPosts = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const [hasMore, setHasMore] = useState(true);

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    data.savedPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
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

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `/api/user/${user.id}?offset=${userData.savedPosts.length}&limit=10`
      );
      const newData = await response.json();

      if (newData.savedPosts.length === 0) {
        setHasMore(false);
      } else {
        setUserData((prevData) => ({
          ...prevData,
          savedPosts: [...prevData.savedPosts, ...newData.savedPosts],
        }));
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  if (userData && Object.keys(userData).length > 0) {
    return loading || !isLoaded ? (
      <Loader />
    ) : (
      <InfiniteScroll
        dataLength={userData.savedPosts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={
          <div className="w-full flex justify-center items-center mt-12">
            <p className=" text-heading4-bold">No more posts</p>
          </div>
        }
      >
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
      </InfiniteScroll>
    );
  } else {
    return null;
  }
};

export default SavedPosts;
