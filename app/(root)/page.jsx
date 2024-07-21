"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";
import { useEffect, useState } from "react";
import { Sriracha } from "next/font/google";
import InfiniteScroll from "react-infinite-scroll-component";
import Frame from "@components/Frame";

const sriracha = Sriracha({ subsets: ["latin"], weight: "400" });

const Home = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [feedPost, setFeedPost] = useState([]);
  const [userData, setUserData] = useState({});
  const [hasMore, setHasMore] = useState(true);

  const updateUser = async () => {
    if (user) {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setUserData(data);
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
            const response = await fetch(`/api/user/${user.id}`);
            if (!response.ok) {
              throw new Error("Unauthorized");
            }
            const data = await response.json();
            setUserData(data);
            getFeedPost();
          } else {
            getFeedPost();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isLoaded, user]); // เพิ่มการเช็ค isLoaded

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="w-full flex flex-col">
      <InfiniteScroll
        dataLength={feedPost.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <div className="flex flex-col w-full items-center gap-10">
          <Frame
            posts={feedPost}
            updateUser={updateUser}
            sriracha={sriracha}
            userData={userData}
          />
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
