"use client";

import {
  AutoAwesomeOutlined,
  Bookmark,
  BookmarkBorder,
  CameraAltOutlined,
  DeleteOutline,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import ToggleStatus from "@components/ToggleStatus";

const PurpleFrame = ({
  post,
  creator,
  loggedInUser,
  updateUser,
  sriracha,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isLiked, setIsLiked] = useState(
    loggedInUser?.likedPosts?.some((item) => item._id === post._id)
  );
  const [isSaved, setIsSaved] = useState(
    loggedInUser?.savedPosts?.some((item) => item._id === post._id)
  );
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);


  const dateTime = post?.createdAt;
  const date = format(new Date(dateTime), "yyyy.MM.dd");

  const expand = (e) => {
    setIsExpand(e);
  };

  const details = post.details;

  const handleSave = async () => {
    if (loading) return; // ถ้ากำลัง loading อยู่ให้ return ออกไปก่อน
    setIsSaved(!isSaved);
    setLoading(true);
    try {
      const response = await fetch(
        `/api/user/${loggedInUser.clerkId}/save/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error saving post");
      }
      await updateUser();
    } catch (error) {
      console.error(error);
      setIsSaved(!isSaved);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (loading) return;
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setLoading(true);
    try {
      const response = await fetch(
        `/api/user/${loggedInUser.clerkId}/like/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error liking post");
      }
      await updateUser();
    } catch (error) {
      console.error(error);
      setIsLiked(!isLiked); // Revert the change if there's an error
      setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1)); // Revert the likes count
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/post/${post._id}/${creator._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setIsDeleted(true);
      await updateUser();
    } else {
      console.error("Failed to delete post");
    }
  };

  const confirmDelete = () => {
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const confirmAndDelete = async () => {
    await handleDelete();
    setShowConfirm(false);
  };

  return !isDeleted ? (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="card-container relative pb-14 bg-[#d495f6] shadow-lg z-10">
        <div className="w-full relative flex justify-end pb-3 gap-3 z-20">
          <p className="date text-white">{date}</p>
          {loggedInUser &&
          Object.keys(loggedInUser).length > 0 &&
          post.creatorType !== "Guest" ? (
            loggedInUser.clerkId !== creator?.clerkId ? (
              isSaved ? (
                <Bookmark
                  sx={{ color: "purple", cursor: "pointer" }}
                  onClick={() => handleSave()}
                />
              ) : (
                <BookmarkBorder
                  sx={{ color: "white", cursor: "pointer" }}
                  onClick={() => handleSave()}
                />
              )
            ) : (
              <>
                <ToggleStatus id={post._id} postStatus={post.status} />
                <DeleteOutline
                  sx={{ color: "white", cursor: "pointer" }}
                  onClick={() => confirmDelete()}
                />
                <Link
                  href={{
                    pathname: `/preview/${post._id}`,
                    query: {
                      post: post._id,
                      date,
                    },
                  }}
                >
                  <CameraAltOutlined
                    sx={{ color: "white", cursor: "pointer" }}
                  />
                </Link>
                <Link href={`/upgrade/${post._id}`}>
                  <AutoAwesomeOutlined
                    sx={{
                      color: "white",
                      cursor: "pointer",
                      position: "absolute",
                      left: 0,
                      zIndex: "50",
                    }}
                  />
                </Link>
              </>
            )
          ) : post.creatorType === "Guest" ? (
            <div className="flex flex-col z-20">
              <p className="text-end text-subtle-medium">*Post by guest.</p>
              <span className="text-subtext text-tiny-medium">
                This post will be deleted in 1 hour.
              </span>
            </div>
          ) : null}
        </div>

        <div
          onClick={
            creator ? () => setIsExpand((prevState) => !prevState) : null
          }
          className="w-full md:min-h-[200px] xl:min-h-[300px] max-h-[600px] overflow-hidden flex items-center"
        >
          <Image
            src={post.postPhoto}
            alt="post photo"
            width={200}
            height={150}
            layout="responsive"
            className="w-full"
          />
        </div>
        <div className={`${sriracha.className} post-caption-web text-white`}>
          <p>{post.caption}</p>
        </div>
        <div className="flex absolute left-5 bottom-5 items-center pt-3 gap-1">
          {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
            post.creatorType === "User" ? (
              !isLiked ? (
                <FavoriteBorder
                  sx={{ color: "white", cursor: "pointer" }}
                  onClick={() => handleLike()}
                />
              ) : (
                <Favorite
                  sx={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleLike()}
                />
              )
            ) : (
              <Favorite sx={{ color: "black" }} />
            )
          ) : (
            <Favorite sx={{ color: "black" }} />
          )}
          {post.creatorType === "User" ? (
            <p className="text-white text-small-semibold flex justify-center items-center gap-1">
              {likesCount.toLocaleString()}
              <span className="text-tiny-medium">Like</span>
            </p>
          ) : null}
        </div>
        <div className="right-5 bottom-5 absolute">
          {creator !== null ? (
            !isExpand ? (
              <ExpandMoreOutlined
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => expand(true)}
              />
            ) : (
              <ExpandLessOutlined
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => expand(false)}
              />
            )
          ) : (
            <p className="text-subtle-medium text-subtext">
              This post has no creator.
            </p>
          )}
        </div>
      </div>
      {isExpand ? (
        <div className="card-container gap-3 rounded-b-xl bg-[#e1b1fb] shadow-lg">
          <div className="w-full">
            <div className="flex justify-between">
              <Link href={`/profile/${creator.username}`}>
                <div className="flex gap-3 items-center">
                  <div className="w-[45px] h-[45px] relative">
                    <Image
                      src={creator.profilePhoto}
                      alt="profile photo"
                      fill
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-small-semibold text-black">
                      {creator.firstName} {creator.lastName}
                    </p>
                    <p className="text-subtle-medium text-light-2">
                      {creator.username}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-body-bold">{post.caption}</p>
            <p className="border border-subtext/30 font-thin w-full"></p>
          </div>
          <div className="details">
            {details.map((detail, index) => (
              <div key={index}>
                <p className="text-subtle-medium  md:text-small-semibold break-words whitespace-normal">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={confirmAndDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p className="text-center text-subtext">Post deleted</p>
  );
};

export default PurpleFrame;
