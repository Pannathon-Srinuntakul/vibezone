import Image from "next/image";
import React from "react";

const AdBar = () => {
  return (
    <div className="adbar scrollbar-thin">
      <p className="text-x-small-semibold pl-3 pt-1 text-light-2">ADS</p>
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
