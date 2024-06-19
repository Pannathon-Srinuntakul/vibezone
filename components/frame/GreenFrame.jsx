"use client";

import {
  AutoAwesomeOutlined,
  Bookmark,
  BookmarkBorder,
  CameraAltOutlined,
  Delete,
  DeleteOutline,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  Favorite,
  FavoriteBorder,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const GreenFrame = ({
  post,
  creator,
  guest,
  loggedInGuest,
  loggedInUser,
  update,
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
  const [showPreview, setShowPreview] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const postRef = useRef(null);
  const router = useRouter();

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

  const handleSavePost = () => {
    const element = postRef.current;
    element.classList.remove("invisible");

    domtoimage
      .toPng(element, {
        quality: 95,
        filter: (node) =>
          node.id !== "hideOnSave" &&
          node.id !== "saveBtn" &&
          node.id !== "expandBtn",
        useCORS: true,
        backgroundColor: "transparent",
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${post.caption}.png`;
        link.href = dataUrl;
        link.click();
        element.classList.add("invisible");
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
        element.classList.add("invisible");
      });
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
      <div className="card-container relative pb-14 bg-[#adf695] shadow-lg z-10">
        <div className="w-full relative flex justify-end pb-3 gap-3 z-20">
          <p className="date text-[#6E6692]">{date}</p>
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
                  sx={{ color: "#6E6692", cursor: "pointer" }}
                  onClick={() => handleSave()}
                />
              )
            ) : (
              <>
                <DeleteOutline
                  sx={{ color: "#6E6692", cursor: "pointer" }}
                  onClick={() => confirmDelete()}
                />
                <CameraAltOutlined
                  sx={{ color: "#6E6692", cursor: "pointer" }}
                  onClick={() => setShowPreview(true)}
                />
                <Link href={`/upgrade/${post._id}`}>
                  <AutoAwesomeOutlined
                    sx={{
                      color: "#6E6692",
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
                This post will be deleted in 24 hours.
              </span>
            </div>
          ) : null}
        </div>

        <div
          onDoubleClick={() => setIsExpand((prevState) => !prevState)}
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
        <div
          className={`${sriracha.className} post-caption-web text-[#6E6692]`}
        >
          <p>{post.caption}</p>
        </div>
        <div className="flex absolute left-5 bottom-5 items-center pt-3 gap-1">
          {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
            post.creatorType === "User" ? (
              !isLiked ? (
                <FavoriteBorder
                  sx={{ color: "#6E6692", cursor: "pointer" }}
                  onClick={() => handleLike()}
                />
              ) : (
                <Favorite
                  sx={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleLike()}
                />
              )
            ) : null
          ) : null}
          {post.creatorType === "User" ? (
            <p className="text-[#6E6692] text-small-semibold flex justify-center items-center gap-1">
              {likesCount.toLocaleString()}{" "}
              <span className="text-tiny-medium">Like</span>
            </p>
          ) : null}
        </div>
        <div className="right-5 bottom-5 absolute">
          {creator !== null ? (
            !isExpand ? (
              <ExpandMoreOutlined
                sx={{ color: "#6E6692", cursor: "pointer" }}
                onClick={() => expand(true)}
              />
            ) : (
              <ExpandLessOutlined
                sx={{ color: "#6E6692", cursor: "pointer" }}
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
        <div className="card-container gap-3 rounded-b-xl bg-[#c7f3b8] shadow-lg">
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
                <p className="text-subtle-medium indent-6 md:text-small-semibold break-words #6E6692space-normal">
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

      {showPreview && (
        <div className="fixed inset-0 bg-green-1 z-30 overflow-auto">
          <p className="close-preview" onClick={() => setShowPreview(false)}>
            x
          </p>
          <div className="preview-container">
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col w-5/6 md:w-1/2 lg:w-1/3">
                <div className="frame-container bg-[#adf695]">
                  <p className="absolute right-1 top-1 text-subtle-medium text-[#6E6692]">
                    {date}
                  </p>
                  <div className="w-full md:min-h-[200px] xl:min-h-[300px] flex items-center">
                    <img
                      src={post.postPhoto}
                      alt="post photo"
                      width={200}
                      height={150}
                      layout="responsive"
                      className="w-full"
                    />
                  </div>
                  <div
                    className={`${sriracha.className} post-caption-pre text-[#6E6692]`}
                  >
                    <p>{post.caption}</p>
                  </div>
                  <div id="expandBtn" className="right-6 bottom-3 absolute">
                    {!isExpand ? (
                      <ExpandMoreOutlined
                        sx={{ cursor: "pointer" }}
                        onClick={() => expand(true)}
                      />
                    ) : (
                      <ExpandLessOutlined
                        sx={{ cursor: "pointer" }}
                        onClick={() => expand(false)}
                      />
                    )}
                  </div>
                  <div className="flex absolute left-2 bottom-7">
                    {showLikes ? (
                      <VisibilityOff
                        id="hideOnSave"
                        onClick={() => setShowLikes(false)}
                        sx={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Visibility
                        id="hideOnSave"
                        onClick={() => setShowLikes(true)}
                        sx={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                  <div className="flex absolute bottom-5 left-1/2 transform -translate-x-1/2 items-center pt-3 gap-1">
                    {showLikes ? (
                      <p className="text-[#6E6692] text-small-semibold flex justify-center items-center gap-1">
                        <Favorite
                          sx={{ color: "Green", width: 40, height: 40 }}
                        />
                        {likesCount.toLocaleString()}{" "}
                        <span className="text-tiny-medium">Like</span>
                      </p>
                    ) : null}
                  </div>
                </div>
                {isExpand ? (
                  <div className="p-5 sm:p-7 md:p-7 lg:p-6 flex flex-col gap-3 bg-[#c7f3b8] shadow-lg">
                    <div className="w-full">
                      <div className="flex relative w-full ">
                        {showProfile ? (
                          <div className="flex gap-3 items-center">
                            <div className="w-[45px] h-[45px]">
                              <img
                                src={creator.profilePhoto}
                                alt="profile photo"
                                className="rounded-full object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-small-semibold text-black">
                                {creator.firstName} {creator.lastName}
                              </p>
                              <p className="text-subtle-medium text-light-3">
                                {creator.username}
                              </p>
                            </div>
                          </div>
                        ) : null}
                        <div className="absolute right-5">
                          {showProfile ? (
                            <VisibilityOff
                              id="hideOnSave"
                              onClick={() => setShowProfile(false)}
                              sx={{ cursor: "pointer" }}
                            />
                          ) : (
                            <Visibility
                              id="hideOnSave"
                              onClick={() => setShowProfile(true)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                      <p className="text-body-bold">{post.caption}</p>
                      <p className="border border-subtext/30 font-thin w-full"></p>
                    </div>
                    <div className="details">
                      {details.map((detail, index) => (
                        <div key={index}>
                          <p className="text-subtle-medium indent-6 md:text-small-semibold break-words #6E6692space-normal">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col w-1/2 gap-2 items-center mt-10 pb-32">
                <button
                  id="saveBtn"
                  onClick={handleSavePost}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl"
                >
                  Save as Image
                </button>
                <p className="text-center text-subtle-medium text-subtext">
                  If the image does not display, please wait a moment and try
                  saving it again.
                </p>
              </div>
            </div>
          </div>

          {/* To save */}
          <div className="w-full h-full absolute -top-[9999999px] -right-[99999999px] py-10 overflow-hidden">
            <div className="mt-96">
              <div
                ref={postRef}
                id="postToSave"
                className="flex flex-col w-[800px] invisible"
              >
                <div className="bg-[#adf695] frame-container">
                  <p className="absolute right-1 top-1 text-base-bold text-[#6E6692]">
                    {date}
                  </p>
                  <div className={`w-full flex flex-col items-center`}>
                    <img
                      src={post.postPhoto}
                      alt="post photo"
                      width={200}
                      height={150}
                      layout="responsive"
                      className="w-full"
                    />
                  </div>
                  <div
                    className={`${sriracha.className} post-caption-save text-[#6E6692]`}
                  >
                    <p>{post.caption}</p>
                  </div>
                  <div className="flex absolute bottom-3 left-1/2 transform -translate-x-1/2 items-center">
                    {showLikes ? (
                      <p className="text-[#6E6692] text-[20px] flex justify-center items-center gap-1">
                        <Favorite
                          sx={{ color: "Green", width: 60, height: 60 }}
                        />
                        {likesCount.toLocaleString()}{" "}
                        <span className="text-[15px]">Liked</span>
                      </p>
                    ) : null}
                  </div>
                </div>
                {isExpand ? (
                  <div className="p-10 flex flex-col gap-8 bg-[#c7f3b8] shadow-lg">
                    <div className="w-full">
                      <div className="flex justify-between">
                        {showProfile ? (
                          <div className="flex gap-7 items-center">
                            <div className="w-[90px] h-[90px]">
                              <img
                                src={creator.profilePhoto}
                                alt="profile photo"
                                className="rounded-full object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-[26px] font-semibold text-black">
                                {creator.firstName} {creator.lastName}
                              </p>
                              <p className="text-[18px] text-light-3">
                                {creator.username}
                              </p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                      <p className="text-[28px] font-bold">{post.caption}</p>
                      <p className="border border-subtext/75 font-thin w-full"></p>
                    </div>
                    <div className="flex flex-col gap-8 pl-4 justify-start">
                      {details.map((detail, index) => (
                        <div key={index}>
                          <p className="text-[18px] indent-10 break-words #6E6692space-normal">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p className="text-center text-subtext">Post deleted</p>
  );
};

export default GreenFrame;
