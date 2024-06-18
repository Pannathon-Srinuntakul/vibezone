"use client";

import { useUser } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";
import ProfileCard from "@components/cards/ProfileCard";
import BlueFrame from "@components/frame/BlueFrame";
import GreenFrame from "@components/frame/GreenFrame";
import PinkFrame from "@components/frame/PinkFrame";
import PurpleFrame from "@components/frame/PurpleFrame";
import YellowFrame from "@components/frame/YellowFrame";
import Loader from "@components/Loader";
import { Search } from "@mui/icons-material";
import { Sriracha } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const sriracha = Sriracha({ subsets: ["latin"], weight: "400" });

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [searchResults, setSearchResults] = useState({ users: [], posts: [] });
  const { user, isLoaded } = useUser();
  const [clientIp, setClientIp] = useState("");
  const [userData, setUserData] = useState({});
  const [guestData, setGuestData] = useState({});
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [showingUsers, setShowingUsers] = useState(true);
  const [searchLoading, setSearchLoading] = useState();
  const [hasMore, setHasMore] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoaded) {
          if (user) {
            const response = await fetch(`/api/user/${user.id}`);
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
  }, [isLoaded, user]);

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

  const handleShowUsers = async () => {
    if (!searchQuery.trim()) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      try {
        setSearchLoading(true);
        const response = await fetch(
          `/api/search/users/${searchQuery}?offset=0&limit=10`
        );
        const users = await response.json();
        setSearchResults({ users, posts: [] });
        setShowingUsers(true);
        setSearchLoading(false);
      } catch (error) {
        console.error("Error fetching search users:", error);
      }
    }
  };

  const handleShowPosts = async () => {
    if (!searchQuery.trim()) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      try {
        setSearchLoading(true);
        const response = await fetch(
          `/api/search/posts/${searchQuery}?offset=0&limit=10`
        );
        const posts = await response.json();
        setSearchResults({
          users: [],
          posts: posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          ),
        });
        setShowingUsers(false);
        setSearchLoading(false);
      } catch (error) {
        console.error("Error fetching search posts:", error);
      }
    }
  };

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `/api/search/${
          showingUsers ? "users" : "posts"
        }/${searchQuery}?offset=${
          searchResults[showingUsers ? "users" : "posts"].length
        }&limit=10`
      );
      const newData = await response.json();

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setSearchResults((prevResults) => ({
          ...prevResults,
          [showingUsers ? "users" : "posts"]: [
            ...prevResults[showingUsers ? "users" : "posts"],
            ...newData,
          ],
        }));
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <>
      <div className="w-4/5 md:w-2/3 lg:w-1/2 items-center justify-center flex flex-col mt-20 pb-6">
        <div className="relative w-full">
          <input
            type="text"
            className={`w-full rounded-full p-2 pl-3 ${
              showWarning ? "border border-red-500" : ""
            }`}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {showWarning && (
          <div className="text-red-500 mt-1">This field is required.</div>
        )}
      </div>
      <div className="flex gap-10 sm:gap-36 pb-10">
        <button
          onClick={handleShowUsers}
          className={
            showingUsers
              ? "bg-active px-3 py-2 rounded-full text-small-semibold drop-shadow-lg"
              : "bg-white px-3 py-2 rounded-full text-small-semibold drop-shadow-lg"
          }
        >
          Show Users
          <Search
            className="ml-1 text-gray-400 border-l pl-1 border-gray-400"
            style={{ cursor: "pointer" }}
          />
        </button>
        <button
          onClick={handleShowPosts}
          className={
            !showingUsers
              ? "bg-active px-3 py-2 rounded-full text-small-semibold drop-shadow-lg"
              : "bg-white px-3 py-2 rounded-full text-small-semibold drop-shadow-lg"
          }
        >
          Show Posts
          <Search
            className="ml-1 text-gray-400 border-l pl-1 border-gray-400"
            style={{ cursor: "pointer" }}
          />
        </button>
      </div>
      {!searchLoading ? (
        <div className="flex flex-col items-center w-full">
          <div className="w-full lg:w-1/2 items-center flex flex-col pb-2 border-b-2 border-light-2">
            {searchResults.users.length > 0 && (
              <>
                <h3 className="text-subtext text-heading3-bold p-5">Users</h3>
                <div className="w-full">
                  <InfiniteScroll
                    dataLength={searchResults.users.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Loader />}
                    endMessage={
                      <div className="w-full flex justify-center items-center mt-12">
                        <p className=" text-heading4-bold">No more users</p>
                      </div>
                    }
                    className="w-full flex flex-col justify-start items-start gap-10 pb-5 "
                  >
                    {searchResults.users.map((user, index) => (
                      <div key={index} className="bg-white rounded-full drop-shadow-lg p-2 flex items-center w-full">
                        <Link
                          href={`/profile/${user.username}`}
                          className="flex"
                        >
                          <ProfileCard key={user._id} userData={user} />
                          <div className="flex text-black justify-center gap-2 p-2 items-center max-sm:gap-0.5">
                            <p className="text-subtle-medium">
                              {user.posts.length}
                            </p>
                            <p className="text-subtle-medium">Posts</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </>
            )}
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            {searchResults.posts.length > 0 && (
              <div className="w-full flex flex-col justify-center items-center">
                <h3 className="text-subtext text-heading3-bold p-5">Posts</h3>
                <div className="flex flex-col w-full items-center gap-10">
                  <div className="w-full">
                  <InfiniteScroll
                    dataLength={searchResults.posts.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Loader />}
                    endMessage={
                      <div className="w-full flex justify-center items-center mt-12">
                        <p className=" text-heading4-bold">No more posts</p>
                      </div>
                    }
                  >
                    {searchResults.posts.map((post, index) => (
                      <div key={index} className="flex flex-col justify-start items-start gap-10 pb-5">
                        {post.frame === "Blue" && (
                          <BlueFrame
                            key={post._id}
                            post={post}
                            creator={post.creator}
                            guest={clientIp}
                            loggedInGuest={guestData}
                            loggedInUser={userData}
                            update={updateUser}
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
                            update={updateUser}
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
                            update={updateUser}
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
                            update={updateUser}
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
                            update={updateUser}
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
                  </InfiniteScroll>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SearchComponent;
