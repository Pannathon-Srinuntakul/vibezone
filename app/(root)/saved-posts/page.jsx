"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";
import PostCard from "@components/cards/PostCard";
import BlueFrame from "@components/frame/BlueFrame";
import CloudFrame from "@components/frame/CloudFrame";
import GreenFrame from "@components/frame/GreenFrame";
import PinkFrame from "@components/frame/PinkFrame";
import PrideFrame from "@components/frame/PrideFrame";
import PurpleFrame from "@components/frame/PurpleFrame";
import YellowFrame from "@components/frame/YellowFrame";
import BlackFrame from "@components/frame/ฺBlackframe";
import { Sriracha } from "next/font/google";
import React, { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const sriracha = Sriracha({ subsets: ["latin"], weight: "400" });

const SavedPosts = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const [hasMore, setHasMore] = useState(true);

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    data?.savedPosts?.sort(
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
      <div className="w-full">
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
          <div className="mt-20 lg:mt-0 flex flex-col w-full items-center gap-10">
            {userData?.savedPosts?.map((post, index) => {
              if (post?.status === "Private") {
                return null;
              }
              return (
                <div className="w-full" key={index}>
                  {post.frame === "Blue" && (
                    <BlueFrame
                      key={post._id}
                      post={post}
                      creator={post.creator}
                      loggedInUser={userData}
                      update={getUser}
                      updateUser={updateUser}
                      sriracha={sriracha}
                    />
                  )}
                  {post.frame === "Pink" && (
                    <PinkFrame
                      key={post._id}
                      post={post}
                      creator={post.creator}
                      loggedInUser={userData}
                      update={getUser}
                      updateUser={updateUser}
                      sriracha={sriracha}
                    />
                  )}
                  {post.frame === "Yellow" && (
                    <YellowFrame
                      key={post._id}
                      post={post}
                      creator={post.creator}
                      loggedInUser={userData}
                      update={getUser}
                      updateUser={updateUser}
                      sriracha={sriracha}
                    />
                  )}
                  {post.frame === "Purple" && (
                    <PurpleFrame
                      key={post._id}
                      post={post}
                      creator={post.creator}
                      loggedInUser={userData}
                      update={getUser}
                      updateUser={updateUser}
                      sriracha={sriracha}
                    />
                  )}
                  {post.frame === "Green" && (
                    <GreenFrame
                      key={post._id}
                      post={post}
                      creator={post.creator}
                      loggedInUser={userData}
                      update={getUser}
                      updateUser={updateUser}
                      sriracha={sriracha}
                    />
                  )}
                  {post.frame === "Black" && (
                    <BlackFrame
                      key={post._id}
                      post={post}
                      creator={post.creator}
                      loggedInUser={userData}
                      updateUser={updateUser}
                      sriracha={sriracha}
                    />
                  )}
                  {post.frame === "Pride" && (
                    <PrideFrame
                      key={post._id}
                      post={post}
                      creator={post.creator}
                      loggedInUser={userData}
                      updateUser={updateUser}
                      sriracha={sriracha}
                    />
                  )}
                  {post.frame === "Cloud" && (
                    <CloudFrame
                      key={post._id}
                      post={post}
                      creator={post.creator}
                      loggedInUser={userData}
                      updateUser={updateUser}
                      sriracha={sriracha}
                    />
                  )}
                  {!post.frame && (
                    <PostCard
                      key={post._id}
                      post={post}
                      creator={post.creator}
                      loggedInUser={userData}
                      update={getUser}
                      updateUser={updateUser}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  } else {
    return <p className="mx-auto mt-20 lg:mt-0 text-center">Please login</p>;
  }
};

export default SavedPosts;
