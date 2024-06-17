import { useUser } from "@clerk/nextjs";
import { Edit } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileCard = ({ userData }) => {
  const { user, isLoaded } = useUser();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(userData.bio || "");
  const router = useRouter();

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = async () => {
    try {
      const response = await fetch(`/api/user/${userData._id}/bio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio }),
      });

      if (response.ok) {
        setBio(userData.bio);
        window.location.reload();
      } else {
        console.error("Failed to save bio");
      }
    } catch (error) {
      console.error("Error saving bio:", error);
    }
    setIsEditingBio(false);
  };

  const handleCancelEditBio = () => {
    setIsEditingBio(false);
    setBio(userData.bio || "");
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 lg:gap-5 items-center">
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <Image
            src={userData.profilePhoto}
            alt="profile photo"
            width={100}
            height={100}
            layout="responsive"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-subtext text-small-bold sm:text-body-bold md:text-heading4-bold lg:text-heading3-bold">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="text-light-3 text-tiny-medium lg:text-subtle-medium">
            {userData.username}
          </p>
          <div className="flex gap-5 items-center pb-2">
            {isEditingBio ? (
              <>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="border-b border-gray-300 w-full focus:outline-none focus:border-blue-500"
                  maxLength={30}
                />
                <button
                  onClick={handleSaveBio}
                  className="text-blue-500 hover:text-blue-700  text-subtle-medium"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEditBio}
                  className="text-red-500 hover:text-red-700 text-subtle-medium"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="text-small-semibold">{userData.bio}</p>
                {user?.id === userData?.clerkId ? (
                  <Edit
                    sx={{ width: "15px", cursor: "pointer" }}
                    onClick={handleEditBio}
                  />
                ) : null}
              </>
            )}
          </div>
          {user?.id === userData?.clerkId ? (
            <Link
              href="/policy"
              className="text-tiny-medium text-gray-700 mb-4 underline"
              target="_blank"
            >
              Private policy
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
