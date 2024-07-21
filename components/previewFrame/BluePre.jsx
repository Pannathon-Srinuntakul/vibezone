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
import Image from "next/image";

const BluePre = ({ date, post, likesCount, creator, details, sriracha }) => {
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
      <Link className="close-preview" href="/">
        x
      </Link>
      <div className="preview-container">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col w-5/6 md:w-1/2 lg:w-1/3">
            <div className="bg-[#94B9FF] frame-container">
              <p className="absolute right-1 top-1 text-subtle-medium text-[#00008b] z-50">
                {date}
              </p>
              <div className="w-full md:min-h-[200px] xl:min-h-[300px] flex items-center relative">
                <Image
                  src="/framecom/blue/cloud.png"
                  className="absolute -top-4 -right-3 w-[100px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/blue/line2.png"
                  className="absolute -top-4 left-20 w-[60px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/blue/line3.png"
                  className="absolute top-16 -left-5 w-[50px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/blue/flowers.png"
                  className="absolute -top-5 -left-5 w-[60px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/blue/flower2.png"
                  className="absolute bottom-16 -left-3 w-[24px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/blue/star.png"
                  className="absolute -bottom-2 -left-2 w-[24px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/blue/line.png"
                  className="absolute -bottom-2 -right-2 w-[100px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/blue/star2.png"
                  className="absolute bottom-36 -right-4 w-[30px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
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
                  <p className="text-[#00008b] text-small-semibold flex justify-center items-center gap-1">
                    <Favorite
                      sx={{ color: "darkblue", width: 40, height: 40 }}
                    />
                    {likesCount.toLocaleString()}{" "}
                    <span className="text-tiny-medium">Like</span>
                  </p>
                ) : null}
              </div>
            </div>
            {isExpand ? (
              <div className="p-5 sm:p-7 md:p-7 lg:p-6 flex flex-col gap-3 bg-[#87aff9] shadow-lg">
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
                <div className="post-caption-pre flex flex-col items-center">
                  <p className="text-body-bold w-[90%]">{post.caption}</p>
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
      <div className="w-full h-full absolute -top-[9999999px] -right-[99999999px] flex flex-col justify-center items-center py-10">
        <div className="mt-96">
          <div
            ref={postRef}
            id="postToSave"
            className="flex flex-col w-[800px] invisible"
          >
            <div className="bg-[#94B9FF] frame-container overflow-hidden">
              <p className="absolute right-1 top-1 text-base-bold text-[#00008b] z-50">
                {date}
              </p>
              <div className="w-full flex flex-col items-center relative">
                <img
                  src="/framecom/blue/cloud.png"
                  className="absolute -top-7 -right-6 w-[200px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/blue/line2.png"
                  className="absolute -top-6 w-[150px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/blue/line3.png"
                  className="absolute top-52 -left-9 w-[100px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/blue/flowers.png"
                  className="absolute -top-9 -left-8 w-[120px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/blue/flower2.png"
                  className="absolute bottom-60 -left-6 w-[54px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/blue/star.png"
                  className="absolute -bottom-5 -left-5 w-[54px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/blue/line.png"
                  className="absolute -bottom-2 -right-2 w-[230px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/blue/star2.png"
                  className="absolute bottom-72 -right-7 w-[60px]"
                  width={200}
                  height={50}
                  alt="icon"
                />
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
                  <p className="text-[#00008b] text-[20px] flex justify-center items-center gap-1">
                    <Favorite
                      sx={{ color: "darkblue", width: 60, height: 60 }}
                    />
                    {likesCount.toLocaleString()}{" "}
                    <span className="text-[15px]">Like</span>
                  </p>
                ) : null}
              </div>
            </div>
            {isExpand ? (
              <div className="p-10 flex flex-col gap-8 bg-[#87aff9] shadow-lg">
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
                        <div className="flex flex-col">
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
                <div className="w-full flex flex-col justify-center">
                  <p className="text-[28px] font-bold break-words text-center">{post.caption}</p>
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

export default BluePre;
