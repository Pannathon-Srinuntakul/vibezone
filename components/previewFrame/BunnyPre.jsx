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

const BunnyPre = ({ date, post, likesCount, creator, details }) => {
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
            <div className="p-8 pb-20 relative shadow-lg z-50 overflow-hidden bg-white">
              <p className="absolute right-1 top-1 text-subtle-medium text-subtext">
                {date}
              </p>
              <div className="w-full md:min-h-[200px] xl:min-h-[300px] flex items-center pb-8 relative">
                <Image
                  src="/framecom/bunny/bunny1.png"
                  className="absolute -bottom-3 -left-3 w-[120px] -z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/bunny/bunny2.png"
                  className="absolute bottom-0 -right-4 w-[120px] -z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/bunny/bunnyright.png"
                  className="absolute top-14 -right-4 w-[50px] -z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/bunny/bunnyleft.png"
                  className="absolute top-7 -left-1.5 w-[30px] -z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/bunny/line1.png"
                  className="absolute -top-4 right-16 w-[50px] -z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/bunny/line2.png"
                  className="absolute top-7 -right-2.5 w-[30px] -z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/bunny/line3.png"
                  className="absolute -left-2 top-28 w-[20px] -z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/bunny/line4.png"
                  className="absolute left-2 -top-1 w-[40px] -z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src="/framecom/bunny/line5.png"
                  className="absolute -right-2 bottom-24 w-[35px] -z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <Image
                  src={post.postPhoto}
                  alt="post photo"
                  width={200}
                  height={150}
                  layout="responsive"
                  className="w-full -z-30"
                />
              </div>
              {!isExpand ? (
                <div
                  id="expandBtn"
                  className="right-6 bottom-3 absolute z-20"
                  onClick={() => setIsExpand(true)}
                >
                  <ExpandMoreOutlined
                    sx={{ cursor: "pointer", color: "black" }}
                  />
                </div>
              ) : (
                <div
                  id="expandBtn"
                  className="right-6 bottom-3 absolute z-20"
                  onClick={() => setIsExpand(false)}
                >
                  <ExpandLessOutlined
                    sx={{ cursor: "pointer", color: "black" }}
                  />
                </div>
              )}
              {showLikes ? (
                <VisibilityOff
                  id="hideOnSave"
                  onClick={() => setShowLikes(false)}
                  sx={{ cursor: "pointer", color: "black", zIndex: 50 }}
                />
              ) : (
                <Visibility
                  id="hideOnSave"
                  onClick={() => setShowLikes(true)}
                  sx={{ cursor: "pointer", color: "black", zIndex: 50 }}
                />
              )}

              {showLikes ? (
                <p className="text-black text-small-semibold flex justify-center items-center gap-1">
                  <Favorite sx={{ color: "red" }} />
                  {likesCount.toLocaleString()}{" "}
                  <span className="text-black text-tiny-medium">Like</span>
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
                        sx={{ cursor: "pointer", color: "black" }}
                      />
                    ) : (
                      <Visibility
                        id="hideOnSave"
                        onClick={() => setShowProfile(true)}
                        sx={{ cursor: "pointer", color: "black" }}
                      />
                    )}
                  </div>
                </div>
                <div className="post-caption-pre flex flex-col items-center">
                  <p className="text-body-bold w-[90%] text-black">{post.caption}</p>
                  <p className="border border-subtext/30 font-thin w-full"></p>
                </div>
                <div className="details">
                  {details.map((detail, index) => (
                    <div key={index}>
                      <p className="text-subtle-medium text-black md:text-small-semibold break-words whitespace-normal">
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
              If the image does not display, please wait a moment and try saving
              it again.
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
              <div className="relative">
                <img
                  src="/framecom/bunny/bunny1.png"
                  className="absolute bottom-1 -left-5 w-[250px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/bunny/bunny2.png"
                  className="absolute bottom-6 -right-6 w-[280px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/bunny/bunnyright.png"
                  className="absolute top-52 -right-4 w-[110px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/bunny/bunnyleft.png"
                  className="absolute top-28 -left-2 w-[50px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/bunny/line1.png"
                  className="absolute -top-5 right-24 w-[80px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/bunny/line2.png"
                  className="absolute top-24 -right-5 w-[60px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/bunny/line3.png"
                  className="absolute -left-3 top-72 w-[30px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/bunny/line4.png"
                  className="absolute left-10 -top-2.5 w-[80px] z-10"
                  width={200}
                  height={50}
                  alt="icon"
                />
                <img
                  src="/framecom/bunny/line5.png"
                  className="absolute -right-3 bottom-72 w-[80px] z-10"
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
                  className="w-full pb-20"
                />
              </div>
              {showLikes ? (
                <p className="text-black text-[20px] flex justify-center items-center gap-1">
                  <Favorite sx={{ color: "red", width: 60, height: 60 }} />
                  {likesCount.toLocaleString()}{" "}
                  <span className="text-black text-[15px]">Like</span>
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
                <div className="w-full flex flex-col justify-center">
                  <p className="text-[28px] font-bold break-words text-center">{post.caption}</p>
                  <p className="border border-subtext/75 font-thin w-full"></p>
                </div>
                <div className="flex text-black flex-col gap-8 pl-4 justify-start">
                  {details.map((detail, index) => (
                    <div key={index}>
                      <p className="text-[22px] text-black break-words whitespace-normal">
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

export default BunnyPre;
