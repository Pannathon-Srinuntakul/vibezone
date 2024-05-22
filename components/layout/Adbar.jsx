import { Add } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const AdBar = () => {
  return (
    <div className="adbar scrollbar-thin">
      <div className="px-3 pt-1 flex justify-between items-center w-full">
      <p className="text-x-small-semibold text-light-2">ADS</p>
        <Add   />
      </div>
      <div className="gap-6 mx-3 flex py-2 overflow-auto">
      <div className="flex flex-col w-[500px]">
          <p className="text-black text-small-bold ml-2">Hello</p>
          <div className="relative w-[200px] h-[150px] border rounded-lg  hover:bg-active ">
            <Image
              src="/assets/christmas.jpg"
              fill
              alt="ad"
              className="object-cover rounded-lg p-3"
            />
          </div>
        </div>
        <div className="flex flex-col w-[500px]">
          <p className="text-black text-small-bold ml-2">Hello</p>
          <div className="relative w-[200px] h-[150px] border rounded-lg  hover:bg-active ">
            <Image
              src="/assets/christmas.jpg"
              fill
              alt="ad"
              className="object-cover rounded-lg p-3"
            />
          </div>
        </div>
        <div className="flex flex-col w-[500px]">
          <p className="text-black text-small-bold ml-2">Hello</p>
          <div className="relative w-[200px] h-[150px] border rounded-lg  hover:bg-active ">
            <Image
              src="/assets/christmas.jpg"
              fill
              alt="ad"
              className="object-cover rounded-lg p-3"
            />
          </div>
        </div>
        <div className="flex flex-col w-[500px]">
          <p className="text-black text-small-bold ml-2">Hello</p>
          <div className="relative w-[200px] h-[150px] border rounded-lg  hover:bg-active ">
            <Image
              src="/assets/christmas.jpg"
              fill
              alt="ad"
              className="object-cover rounded-lg p-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBar;
