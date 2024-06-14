import { connectToDB } from "@lib/mongodb/mongoose";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const GuestLogin = ({ clientIp }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: clientIp,
  });
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);

  const router = useRouter();

  const checkUsername = async (username) => {
    try {
      const response = await fetch(`/api/checkUsername?username=${username}`);
      const data = await response.json();
      return data.isTaken;
    } catch (error) {
      console.error("Failed to check username:", error);
      return false;
    }
  };

  const handlePublish = async () => {
    try {
      const postForm = new FormData();

      postForm.append("ipAddress", clientIp.ip);
      postForm.append("firstName", formData.firstName);
      postForm.append("lastName", formData.lastName);
      postForm.append("username", formData.username.toLowerCase());

      const response = await fetch("/api/guest/new", {
        method: "POST",
        body: postForm,
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data) => {
    setFormData(data);
    setShowConfirmation(true);
  };

  return (
    <form
      className="flex flex-col gap-7 pb-12 rounded-xl bg-white drop-shadow-xl pt-12 px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-10">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="mb-2">
              We will record your IP address for guest login purposes.
            </p>
            <Link
              href="/private-policy"
              className="text-subtle-medium text-gray-700 mb-4 underline flex justify-center items-center py-2"
              target="_blank"
            >
              Private policy
            </Link>{" "}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                }}
                className="py-2 px-4 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                className="py-2 px-4 bg-[#f1592a] text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-center text-heading2-bold">Post as guest</h1>
      <p className="w-full border border-subtext"></p>
      <div className="px-6 flex flex-col gap-5">
        <div>
          <label
            htmlFor="firstName"
            className="text-subtext text-heading4-bold"
          >
            <p className="pl-2">First name</p>
          </label>
          <input
            {...register("firstName", {
              required: "Required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Must be more than 2 characters";
                }
              },
            })}
            type="text"
            rows={5}
            className="w-full rounded-full bg-[#ACA9BB20] px-2"
            id="firstName"
          />

          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="text-subtext text-heading4-bold">
            <p className="pl-2">Last name</p>
          </label>
          <input
            {...register("lastName", {
              required: "Required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Must be more than 2 characters";
                }
              },
            })}
            type="text"
            rows={5}
            className="w-full rounded-full bg-[#ACA9BB20] px-2"
            id="lastName"
          />

          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="username" className="text-subtext text-heading4-bold">
            <p className="pl-2">Username</p>
          </label>
          <input
            {...register("username", {
              required: "Required",
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Only English characters are allowed",
              },
              validate: (value) => {
                if (value.length < 3) {
                  return "Must be more than 2 characters";
                }
              },
            })}
            type="text"
            rows={5}
            className="w-full rounded-full bg-[#ACA9BB20] px-2"
            id="username"
            onBlur={async () => {
              const username = watch("username").toLowerCase();
              const usernameTaken = await checkUsername(username);
              setIsUsernameTaken(usernameTaken);
            }}
          />

          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          {isUsernameTaken && (
            <p className="text-red-500">Username already taken</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2.5 mt-5 bg-[#ACA9BB20] rounded-full px-5 text-subtext text-small-bold drop-shadow-md"
          >
            Publish
          </button>
        </div>
      </div>
    </form>
  );
};

export default GuestLogin;
