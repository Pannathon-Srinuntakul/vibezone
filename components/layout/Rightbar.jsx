"use client";

import { useUser } from "@clerk/nextjs";
import { Add, Delete } from "@mui/icons-material";
import { add, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RightBar = () => {
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
    if (isLoaded) {
      getAds();
    }
  }, [isLoaded]);

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
      <div className="rightbar">
        <div className="fixed flex justify-between items-center w-2/3 top-20">
          <p className="text-x-small-semibold text-light-2">ADS</p>
          {user ? (
            <Link href="/create-ads">
              <Add />
            </Link>
          ) : null}
        </div>
        <div className="flex flex-col pb-12 gap-8">
          {ads.map((ad, index) => {
            const calculateExpiryDate = (dateTime) => {
              const date = format(
                add(new Date(dateTime), { days: 7 }),
                "yyyy.MM.dd"
              );
              return date;
            };
            return (
                <div key={index} className="bg-black flex flex-col shadow-lg p-3">
                  <p className="text-white text-tiny-medium pb-1">
                    Expired In {calculateExpiryDate(ad.createdAt)}
                  </p>
                  <a
                    href={
                      ad.link.startsWith("http") ? ad.link : `http://${ad.link}`
                    }
                    target="_blank"
                  >
                    <div className="flex justify-center items-center min-h-[200px] max-h-[400px] overflow-hidden">
                      <Image
                        src={ad.postPhoto}
                        width={100}
                        height={100}
                        layout="responsive"
                        alt="ad"
                        className="object-cover"
                      />
                    </div>
                  </a>
                  <div className="flex mt-1 justify-between">
                    <p className="text-white ml-2">{ad.caption}</p>
                    {!user ? null : userData?._id === ad.creator ? (
                      <Delete
                        sx={{ color: "white", cursor: "pointer" }}
                        onClick={() => confirmDelete(ad)}
                      />
                    ) : null}
                  </div>
                  <a href={ad.link} target="_blank" className="text-tiny-medium pt-1 text-ellipsis overflow-hidden whitespace-nowrap text-white">
                    {ad.link.startsWith("http://") ||
                    ad.link.startsWith("https://")
                      ? ad.link.replace(/^(https?:\/\/)?(www\.)?/i, "www.")
                      : ad.link}
                  </a>
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

export default RightBar;
