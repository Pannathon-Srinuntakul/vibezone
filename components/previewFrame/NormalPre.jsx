"use client";
import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
  Favorite,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import Link from "next/link";

const NormalPre = ({ date, post, likesCount, creator, details }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const postRef = useRef(null);
  
  const handleSavePost = () => {
    const element = postRef.current;
    element.classList.remove("invisible");
    domtoimage
      .toPng(element, {
        quality: 100,
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

  
  return (
      <div className="fixed inset-0 bg-green-1 z-30 overflow-auto">
        <Link className="close-preview" href='/'>x</Link>
        <div className="preview-container">
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col w-5/6 md:w-1/2 lg:w-1/3">
              <div className="p-8 pb-20 relative shadow-lg z-50 overflow-hidden bg-white">
                <p className="absolute right-1 top-1 text-subtle-medium text-subtext">
                  {date}
                </p>
                <div className="w-full md:min-h-[200px] xl:min-h-[300px] flex items-center pb-8">
                  <img
                    src={post.postPhoto}
                    alt="post photo"
                    width={200}
                    height={150}
                    layout="responsive"
                    className="w-full"
                  />
                </div>
                {!isExpand ? (
                  <div
                    id="expandBtn"
                    className="right-6 bottom-3 absolute"
                    onClick={() => setIsExpand(true)}
                  >
                    <ExpandMoreOutlined sx={{ cursor: "pointer" }} />
                  </div>
                ) : (
                  <div
                    id="expandBtn"
                    className="right-6 bottom-3 absolute"
                    onClick={() => setIsExpand(false)}
                  >
                    <ExpandLessOutlined sx={{ cursor: "pointer" }} />
                  </div>
                )}
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

                {showLikes ? (
                  <p className="text-black text-small-semibold flex justify-center items-center gap-1">
                    <Favorite sx={{ color: "red" }} />
                    {likesCount.toLocaleString()}{" "}
                    <span className="text-subtext text-tiny-medium">Like</span>
                  </p>
                ) : null}
              </div>
              {isExpand ? (
                <div className="p-5 sm:p-7 md:p-7 lg:p-6 flex flex-col gap-3 bg-[#e1ece8] shadow-lg">
                  <div className="w-full">
                    <div className="flex justify-between">
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
                  <div className="w-full flex flex-col justify-center items-center">
                    <p className="text-base-bold">{post.caption}</p>
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
            </div>
            <div className="flex flex-col w-1/2 gap-2 items-center mt-10 pb-32">
              <button
                id="saveBtn"
                className="px-4 py-2 bg-blue-500 text-white rounded-xl"
                onClick={handleSavePost}
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
        <div className="w-full h-full absolute -top-[9999999px] -right-[99999999px] flex justify-center items-center py-10">
          <div className="mt-96">
            <div
              id="postToSave"
              ref={postRef}
              className="flex flex-col w-[800px] invisible"
            >
              <div className="bg-white frame-container">
                <p className="absolute right-1 top-1 text-base-bold text-subtext">
                  {date}
                </p>
                <img
                  src={post.postPhoto}
                  alt="post photo"
                  width={200}
                  height={150}
                  layout="responsive"
                  className="w-full pb-20"
                />
                {showLikes ? (
                  <p className="text-black text-[20px] flex justify-center items-center gap-1">
                    <Favorite sx={{ color: "red", width: 60, height: 60 }} />
                    {likesCount.toLocaleString()}{" "}
                    <span className="text-subtext text-[15px]">Liked</span>
                  </p>
                ) : null}
              </div>
              {isExpand ? (
                <div className="p-10 flex flex-col gap-8 bg-[#e1ece8] shadow-lg">
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
                        <p className="text-[18px]  break-words whitespace-normal">
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
  );
};

export default NormalPre;
