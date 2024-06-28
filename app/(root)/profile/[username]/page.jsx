"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";
import ProfileCard from "@components/cards/ProfileCard";
import BlueFrame from "@components/frame/BlueFrame";
import GreenFrame from "@components/frame/GreenFrame";
import PinkFrame from "@components/frame/PinkFrame";
import PurpleFrame from "@components/frame/PurpleFrame";
import YellowFrame from "@components/frame/YellowFrame";
import Loader from "@components/Loader";
import { Sriracha } from "next/font/google";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const sriracha = Sriracha({ subsets: ["latin"], weight: "400" });

const profile = () => {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [loggedInUserData, setLoggedInUserData] = useState();
  const [hasMore, setHasMore] = useState(true);

  const getUserProfile = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`/api/user/username/${username}`, {
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
    }
  };

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `/api/user/${userData.clerkId}?offset=${userData.posts.length}&limit=10`
      );
      const newData = await response.json();

      if (newData.posts.length === 0) {
        setHasMore(false);
      } else {
        setUserData((prevData) => ({
          ...prevData,
          posts: [...prevData.posts, ...newData.posts],
        }));
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
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
  }, [isLoaded, user]);

  if (!isSignedIn) {
    return <p className="mx-auto text-center mt-20 lg:mt-0">Please login</p>;
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      {userData ? (
        <div className="flex flex-col w-full mt-20 px-5 sm:px-0 lg:mt-5">
          <div className="flex items-center justify-center">
            <div className="w-full lg:w-1/2 rounded-2xl drop-shadow-lg p-5 bg-white">
              <ProfileCard userData={userData} />
            </div>
          </div>
          <InfiniteScroll
            dataLength={userData?.posts?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
              <div className="w-full flex justify-center items-center mt-12">
                <p className=" text-heading4-bold">No more posts</p>
              </div>
            }
          >
            <div className="flex flex-col gap-9 mt-12">
              {userData.posts?.map((post, index) => {
                if (
                  post?.status === "Private" &&
                  post?.creator?.clerkId !== loggedInUserData?.clerkId
                ) {
                  return null;
                }
                return (
                  <div key={index}>
                    {post.frame === "Blue" && (
                      <BlueFrame
                        key={post._id}
                        post={post}
                        creator={post.creator}
                        loggedInUser={loggedInUserData}
                        update={getUserProfile}
                        updateUser={updateUser}
                        sriracha={sriracha}
                      />
                    )}
                    {post.frame === "Pink" && (
                      <PinkFrame
                        key={post._id}
                        post={post}
                        creator={post.creator}
                        loggedInUser={loggedInUserData}
                        update={getUserProfile}
                        updateUser={updateUser}
                        sriracha={sriracha}
                      />
                    )}
                    {post.frame === "Yellow" && (
                      <YellowFrame
                        key={post._id}
                        post={post}
                        creator={post.creator}
                        loggedInUser={loggedInUserData}
                        update={getUserProfile}
                        updateUser={updateUser}
                        sriracha={sriracha}
                      />
                    )}
                    {post.frame === "Purple" && (
                      <PurpleFrame
                        key={post._id}
                        post={post}
                        creator={post.creator}
                        loggedInUser={loggedInUserData}
                        update={getUserProfile}
                        updateUser={updateUser}
                        sriracha={sriracha}
                      />
                    )}
                    {post.frame === "Green" && (
                      <GreenFrame
                        key={post._id}
                        post={post}
                        creator={post.creator}
                        loggedInUser={loggedInUserData}
                        update={getUserProfile}
                        updateUser={updateUser}
                        sriracha={sriracha}
                      />
                    )}
                    {!post.frame && (
                      <PostCard
                        key={post._id}
                        post={post}
                        creator={post.creator}
                        loggedInUser={loggedInUserData}
                        update={getUserProfile}
                        updateUser={updateUser}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <p className="mt-16 lg:mt-0">No User</p>
      )}
    </>
  );
};

export default profile;
