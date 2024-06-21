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

const PurplePre = ({ date, post, likesCount, creator, details, sriracha }) => {
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
      <Link className="close-preview" href='/'>
        x
      </Link>
      <div className="preview-container">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col w-5/6 md:w-1/2 lg:w-1/3">
            <div className="frame-container bg-[#d495f6]">
              <p className="absolute right-1 top-1 text-subtle-medium text-white">
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
                className={`${sriracha.className} post-caption-pre text-white`}
              >
                <p>{post.caption}</p>
              </div>
              <div id="expandBtn" className="right-6 bottom-3 absolute">
                {!isExpand ? (
                  <ExpandMoreOutlined
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsExpand(true)}
                  />
                ) : (
                  <ExpandLessOutlined
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsExpand(false)}
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
                  <p className="text-white text-small-semibold flex justify-center items-center gap-1">
                    <Favorite sx={{ color: "purple", width: 40, height: 40 }} />
                    {likesCount.toLocaleString()}
                    <span className="text-tiny-medium">Like</span>
                  </p>
                ) : null}
              </div>
            </div>
            {isExpand ? (
              <div className="p-5 sm:p-7 md:p-7 lg:p-6 flex flex-col gap-3 bg-[#e1b1fb] shadow-lg">
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
              onClick={handleSavePost}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl"
            >
              Save as Image
            </button>
            <p className="text-center text-subtle-medium text-subtext">
              If the image does not display, please wait a moment and try saving
              it again.
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
            <div className="bg-[#d495f6] frame-container">
              <p className="absolute right-1 top-1 text-base-bold text-white">
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
                className={`${sriracha.className} post-caption-save text-white`}
              >
                <p>{post.caption}</p>
              </div>
              <div className="flex absolute bottom-3 left-1/2 transform -translate-x-1/2 items-center">
                {showLikes ? (
                  <p className="text-white text-[20px] flex justify-center items-center gap-1">
                    <Favorite sx={{ color: "purple", width: 60, height: 60 }} />
                    {likesCount.toLocaleString()}
                    <span className="text-[15px]">Liked</span>
                  </p>
                ) : null}
              </div>
            </div>
            {isExpand ? (
              <div className="p-10 flex flex-col gap-8 bg-[#e1b1fb] shadow-lg">
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

export default PurplePre;
