"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";
import BlueFrame from "@components/frame/BlueFrame";
import GreenFrame from "@components/frame/GreenFrame";
import PinkFrame from "@components/frame/PinkFrame";
import PurpleFrame from "@components/frame/PurpleFrame";
import YellowFrame from "@components/frame/YellowFrame";
import Loader from "@components/Loader";
import { useEffect, useState } from "react";
import { Sriracha } from "next/font/google";
import InfiniteScroll from "react-infinite-scroll-component";
import AdBar from "@components/layout/Adbar";

const sriracha = Sriracha({ subsets: ["latin"], weight: "400" });

const Home = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [feedPost, setFeedPost] = useState([]);
  const [clientIp, setClientIp] = useState("");
  const [userData, setUserData] = useState({});
  const [guestData, setGuestData] = useState({});
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { getToken } = useAuth();

  const getClientIp = async () => {
    if (!user) {
      try {
        const response = await fetch("/api/getClientIp");
        const data = await response.json();
        setClientIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    }
  };

  const updateUser = async () => {
    if (user) {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setUserData(data);
      setIsUserDataLoaded(true);
    }
  };

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `/api/post?offset=${feedPost.length}&limit=10`
      );
      const newData = await response.json();
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setFeedPost((prevPosts) => [...prevPosts, ...newData]);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const getFeedPost = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    const sortedData = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFeedPost(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoaded) {
          if (user) {
            const response = await fetch(`/api/user/${user.id}`, {
              headers: {
                Authorization: `Bearer ${await getToken()}`
              }
            });
            if (!response.ok) {
              throw new Error('Unauthorized');
            }
            const data = await response.json();
            setUserData(data);
            setIsUserDataLoaded(true);
          } else {
            await getClientIp();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isLoaded, user]); // เพิ่มการเช็ค isLoaded

  useEffect(() => {
    if (isUserDataLoaded || (clientIp && !user)) {
      getFeedPost();
    }
  }, [isUserDataLoaded, clientIp, user]);

  useEffect(() => {
    const fetchGuestData = async () => {
      if (clientIp && !user && !isUserDataLoaded) {
        try {
          const response = await fetch(`/api/guest/${clientIp}`);
          const data = await response.json();
          setGuestData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchGuestData();
  }, [clientIp, user, isUserDataLoaded]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="w-full flex flex-col">
      <InfiniteScroll
        dataLength={feedPost.length}
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
          <AdBar />
          {feedPost.map((post, index) => (
            <div className="w-full" key={index}>
              {post.frame === "Blue" && (
                <BlueFrame
                  key={post._id}
                  post={post}
                  creator={post.creator}
                  guest={clientIp}
                  loggedInGuest={guestData}
                  loggedInUser={userData}
                  update={getFeedPost}
                  updateUser={updateUser}
                  sriracha={sriracha}
                />
              )}
              {post.frame === "Pink" && (
                <PinkFrame
                  key={post._id}
                  post={post}
                  creator={post.creator}
                  guest={clientIp}
                  loggedInGuest={guestData}
                  loggedInUser={userData}
                  update={getFeedPost}
                  updateUser={updateUser}
                  sriracha={sriracha}
                />
              )}
              {post.frame === "Yellow" && (
                <YellowFrame
                  key={post._id}
                  post={post}
                  creator={post.creator}
                  guest={clientIp}
                  loggedInGuest={guestData}
                  loggedInUser={userData}
                  update={getFeedPost}
                  updateUser={updateUser}
                  sriracha={sriracha}
                />
              )}
              {post.frame === "Purple" && (
                <PurpleFrame
                  key={post._id}
                  post={post}
                  creator={post.creator}
                  guest={clientIp}
                  loggedInGuest={guestData}
                  loggedInUser={userData}
                  update={getFeedPost}
                  updateUser={updateUser}
                  sriracha={sriracha}
                />
              )}
              {post.frame === "Green" && (
                <GreenFrame
                  key={post._id}
                  post={post}
                  creator={post.creator}
                  guest={clientIp}
                  loggedInGuest={guestData}
                  loggedInUser={userData}
                  update={getFeedPost}
                  updateUser={updateUser}
                  sriracha={sriracha}
                />
              )}
              {!post.frame && (
                <PostCard
                  key={post._id}
                  post={post}
                  creator={post.creator}
                  guest={clientIp}
                  loggedInGuest={guestData}
                  loggedInUser={userData}
                  update={updateUser}
                  updateUser={updateUser}
                />
              )}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
