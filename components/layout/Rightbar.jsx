import { Add } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const RightBar = () => {
  return (
    <div className="rightbar scrollbar-thin">
      <div className="fixed flex justify-between items-center w-1/2 top-20">
      <p className="text-x-small-semibold text-light-2">ADS</p>
        <Add />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-black ml-2">Hello</p>
        <div className="relative w-full h-[150px] border rounded-lg hover:bg-active ">
          <Image
            src="/assets/christmas.jpg"
            fill
            alt="ad"
            className="object-cover rounded-lg p-3"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-black ml-2">Hello</p>
        <div className="relative w-full h-[150px] border rounded-lg hover:bg-active">
          <Image
            src="/assets/christmas.jpg"
            fill
            alt="ad"
            className="object-cover rounded-lg p-3"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-black ml-2">Hello</p>
        <div className="relative w-full h-[150px] border rounded-lg hover:bg-active">
          <Image
            src="/assets/christmas.jpg"
            fill
            alt="ad"
            className="object-cover rounded-lg p-3"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-black ml-2">Hello</p>
        <div className="relative w-full h-[150px] border rounded-lg hover:bg-active">
          <Image
            src="/assets/christmas.jpg"
            fill
            alt="ad"
            className="object-cover rounded-lg p-3"
          />
        </div>
      </div>
      
    </div>
  );
};

export default RightBar;
