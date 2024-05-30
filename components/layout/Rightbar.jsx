"use client";

import { useUser } from "@clerk/nextjs";
import { Add, Delete } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RightBar = () => {
  const [ads, setAds] = useState([]);
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [adData, setAdData] = useState({})

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
    setAdData(data)
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
          <Link href="/create-ads">
            <Add />
          </Link>
        </div>
        <div className="flex flex-col pb-12 gap-12">
          {ads.map((ad, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <p className="text-black ml-2">{ad.caption}</p>
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
              >
                <div
                  className="flex justify-center items-center w-full h-full border 
              border-black/50 drop-shadow-lg rounded-lg hover:bg-white "
                >
                  <Image
                    src={ad.postPhoto}
                    width={100}
                    height={100}
                    layout="responsive"
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

export default RightBar;
