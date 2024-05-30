"use client";

import { useUser } from "@clerk/nextjs";
import CreateAds from "@components/form/CreateAds";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreatePost = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [adsData, setAdsData] = useState({})
  const router = useRouter()
  
  const handleRedirect = () => {
    router.push('/');
  };

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAds = async () => {
    try {
        const response = await fetch('/api/ads')
        const data = await response.json()
        setAdsData(data)
    } catch (error) {
        console.log(error)
    }
  }
  
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getAds()
  }, [])

  const postData = {
    creatorId: userData,
  };
  
  return adsData.length >= 10 ? (
    <div>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-red-500">
            All ad slots are currently occupied. Please try again later.
            </p>
            <button
              onClick={handleRedirect}
              className="py-2 px-4 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
    </div>
  ) : (
    <div className="pt-6 flex items-center w-full justify-center">
        {user ? (
            <CreateAds post={postData} />
        ) : (
            <p>Please sign in first!!!</p>
        )}
    </div>
  );
};

export default CreatePost;
