"use client";

import { useUser } from "@clerk/nextjs";
import { Add, Delete } from "@mui/icons-material";
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
    const sortedData = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setAds(sortedData);
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
      <div className="adbar">
        <div className="px-3 pt-1 flex justify-between items-center w-full">
          <p className="text-x-small-semibold text-light-2">ADS</p>
          <a href="/create-ads">
            <Add />
          </a>
        </div>
        <div className="flex overflow-auto gap-5 p-5">
          {ads.map((ad, index) => (
            <div key={index} className="flex flex-col gap-2 justify-end">
              <div className="flex justify-between w-[150px]">
                <div className="overflow-auto">
                  <p className="text-black text-small-bold ml-2 whitespace-normal">
                    {ad.caption}
                  </p>
                </div>
                {!user ? null : userData?._id === ad.creator ? (
                  <Delete
                    sx={{ color: "black", cursor: "pointer" }}
                    onClick={() => confirmDelete(ad)}
                  />
                ) : null}
              </div>
              <Link
                href={
                  ad.link.startsWith("http") ? ad.link : `http://${ad.link}`
                }
                target="_blank"
                className="mt-3"
              >
                <div
                  className="flex justify-center items-center w-[150px] h-[150px] md:w-[200px] md:h-[200px] border 
              border-black/50 drop-shadow-lg rounded-lg hover:bg-white "
                >
                  <Image
                    src={ad.postPhoto}
                    fill
                    alt="ad"
                    className="object-cover rounded-lg p-3"
                  />
                </div>
              </Link>
            </div>
          ))}
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
