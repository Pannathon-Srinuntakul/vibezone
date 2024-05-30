"use client";

import { useUser } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";
import ProfileCard from "@components/cards/ProfileCard";
import Loader from "@components/Loader";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    try {
      setSearchLoading(true);
      const userResponse = await fetch(`/api/search/users/${searchQuery}`);
      const users = await userResponse.json();

      const postResponse = await fetch(`/api/search/posts/${searchQuery}`);
      const posts = await postResponse.json();

      setSearchResults({
        users,
        posts: posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      });
      setSearchLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }
  };

  const handleShowUsers = async () => {
    if (!searchQuery.trim()) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    const userResponse = await fetch(`/api/search/users/${searchQuery}`);
    const users = await userResponse.json();
    setSearchResults({ users, posts: [] });
    setShowingUsers(true);
    }
  };

  const handleShowPosts = async () => {
    if (!searchQuery.trim()) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    const postResponse = await fetch(`/api/search/posts/${searchQuery}`);
    const posts = await postResponse.json();
    setSearchResults({
      users: [],
      posts: posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    });
    setShowingUsers(false);
  }
  };

  return (
    <>
      <div className="w-4/5 md:w-2/3 lg:w-1/2 items-center justify-center flex flex-col pb-6">
      <div className="relative w-full">
      <input
        type="text"
        className={`w-full rounded-full p-2 pl-3 ${showWarning ? 'border border-red-500' : ''}`}
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 border-l pl-1 border-gray-400"
        onClick={handleSearch}
        style={{ cursor: "pointer" }}
      />
    </div>
      {showWarning && (
        <div className="text-red-500 mt-1">
          This field is required.
        </div>
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
        </button>
      </div>
        {!searchLoading ? (
      <div className="flex flex-col items-center w-full">
        <div className="w-4/5 lg:w-1/2 items-center flex flex-col pb-2 border-b-2 border-light-2">
          {searchResults.users.length > 0 && (
            <>
              <h3 className="text-subtext text-heading3-bold p-5">Users</h3>
              <div className="w-full flex flex-col justify-start items-start gap-10 pb-5">
                {searchResults.users.map((user) => (
                  <div className="bg-white rounded-full drop-shadow-lg p-2 flex w-full">
                    <Link href={`/profile/${user.clerkId}`} className="">
                      <ProfileCard key={user._id} userData={user} />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          {searchResults.posts.length > 0 && (
            <div className="w-full flex flex-col justify-center items-center">
              <h3 className="text-subtext text-heading3-bold p-5">Posts</h3>
              <div className="flex flex-col w-full items-center gap-10">
                {searchResults.posts.map((post) => (
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
        ): (
          <Loader />
        )}
    </>
  );
};

export default SearchComponent;
