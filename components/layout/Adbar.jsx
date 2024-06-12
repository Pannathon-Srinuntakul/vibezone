"use client";

import { useUser } from "@clerk/nextjs";
import { Add, Delete } from "@mui/icons-material";
import { add, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AdBar = () => {
  const [ads, setAds] = useState([]);
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [adData, setAdData] = useState({});

  const getUser = async () => {
    if (user) {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setUserData(data);
    }
  };

  const getAds = async () => {
    const response = await fetch("/api/ads");
    const data = await response.json();
    setAds(data);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getAds();
  }, []);

  const handleDelete = async () => {
    const response = await fetch(`/api/ads/${adData._id}/${adData.creator}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getAds();
    } else {
      console.error("Failed to delete post");
    }
  };

  const confirmDelete = (data) => {
    setShowConfirm(true);
    setAdData(data);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const confirmAndDelete = async () => {
    await handleDelete();
    setShowConfirm(false);
  };

  return (
    <>
      <div className="lg:hidden mt-20 bg-white drop-shadow-lg w-full">
        <div className="px-3 pt-1 flex justify-between items-center w-full">
          <p className=" text-subtle-medium text-light-2">ADS</p>
          {user ? (
            <Link href="/create-ads">
              <Add />
            </Link>
          ) : null}
        </div>
        <div className="grid grid-cols-3 grid-rows-auto gap-3 p-3 bg-gray-100">
          {ads.map((ad, index) => {
            const calculateExpiryDate = (dateTime) => {
              const date = format(
                add(new Date(dateTime), { days: 7 }),
                "yyyy.MM.dd"
              );
              return date;
            };

            return (
              <div
                key={index}
                className="flex flex-col border gap-2 p-1 bg-black shadow-lg"
              >
                <p className="text-white text-subtle-medium">
                  Expired In {calculateExpiryDate(ad.createdAt)}
                </p>
                <a
                  href={
                    ad.link.startsWith("http") ? ad.link : `http://${ad.link}`
                  }
                  target="_blank"
                  className="h-full flex items-center overflow-hidden"
                >
                  <div className="flex w-full max-h-[200px]">
                    <Image
                      src={ad.postPhoto}
                      width={150}
                      height={150}
                      layout="responsive"
                      alt="ad"
                      className="object-contain"
                    />
                  </div>
                </a>
                <div className="flex justify-between">
                  <p className="text-white text-[12px] font-bold sm:text-small-bold ml-2 whitespace-normal">
                    {ad.caption}
                  </p>
                  {!user ? null : userData?._id === ad.creator ? (
                    <Delete
                      sx={{ color: "white", cursor: "pointer" }}
                      onClick={() => confirmDelete(ad)}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this Ad?</p>
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
    </>
  );
};

export default AdBar;
