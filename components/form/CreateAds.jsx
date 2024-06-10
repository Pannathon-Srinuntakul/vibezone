"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateAds = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState(null);
  const [adsData, setAdsData] = useState({});
  const [showFullAds, setShowFullAds] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async (data) => {
    setIsLoading(true);
    if (adsData.length >= 12) {
      setShowFullAds(true);
      setIsLoading(false);
      return;
    } else {
      try {
        const postForm = new FormData();

        postForm.append("creatorId", post.creatorId._id);
        postForm.append("postPhoto", data.postPhoto[0]);
        postForm.append("caption", data.caption);
        postForm.append("link", data.link);

        if (post.creatorId.credit < 300) {
          setShowAlert(true);
          return;
        }

        const response = await fetch("/api/ads/new", {
          method: "POST",
          body: postForm,
        });

        if (response.ok) {
          router.push(`/`);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  const handleRedirect = () => {
    router.push("/");
  };

  const onSubmit = async (data) => {
    setFormData(data);
    setShowConfirmation(true);
    const res = await fetch("/api/ads");
    const datacount = await res.json();
    setAdsData(datacount);
  };

  const confirmSubmit = () => {
    if (isLoading) return;
    setShowConfirmation(false);
    handlePublish(formData);
  };

  return (
    <>
      {showFullAds && (
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
      )}

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-red-500">
              You do not have enough credits to create an ad. Please add more
              credits to proceed.
            </p>
            <button
              onClick={() => setShowAlert(false)}
              className="py-2 px-4 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-10">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="mb-4">Confirm to spend <span className="text-body-bold">500</span> credits?</p>
            <p className="mb-4 text-red-600 text-body-bold">
              *Please check the details before submitting the ad. Once
              confirmed, you will not be able to edit it.
            </p>
            <p className="mb-4 text-red-600 text-body-bold">
              *The ad will be automatically deleted within 7 days.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="py-2 px-4 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="py-2 px-4 bg-[#f1592a] text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <form
        className="flex flex-col w-full gap-7 pb-12 rounded-xl lg:w-1/2 bg-white drop-shadow-xl pt-12 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <p className="text-end text-red-500 text-tiny-medium">
            *The ad will be automatically deleted within 7 days.
          </p>
          <h1 className="text-center text-heading1-bold">Create Ads</h1>
        </div>
        <p className="w-full border border-subtext"></p>
        <div className="flex flex-col justfy-center items-center gap-5 md:gap-3">
          <div className="w-full">
            <label
              htmlFor="photo"
              className="flex flex-col justify-center items-center text-black cursor-pointer"
            >
              <div className="w-1/2">
                {watch("postPhoto") && watch("postPhoto").length > 0 ? (
                  watch("postPhoto")[0].type.startsWith("image/") ? (
                    <Image
                      src={URL.createObjectURL(watch("postPhoto")[0])}
                      alt="post"
                      width={100}
                      height={100}
                      layout="responsive"
                      className="object-cover"
                    />
                  ) : (
                    <div>
                      <p className="text-red-500">Only images are allowed!</p>
                      <Image
                        src="/assets/addprofile.svg"
                        alt="post"
                        width={100}
                        height={100}
                        layout="responsive"
                        className="object-cover"
                      />
                    </div>
                  )
                ) : (
                  <Image
                    src="/assets/addprofile.svg"
                    alt="post"
                    width={100}
                    height={100}
                    layout="responsive"
                    className="object-cover"
                  />
                )}
              </div>
              <p className="text-subtext text-tiny-medium">Upload a photo</p>
            </label>
          </div>
          <input
            {...register("postPhoto", {
              required: "Photo required",
              validate: (value) => {
                if (
                  typeof value === "null" ||
                  (Array.isArray(value) && value.length === 0) ||
                  value === "underfined"
                ) {
                  return "A photo is required!";
                }
                return (
                  value[0].type.startsWith("image/") ||
                  "Only images are allowed!"
                );
              },
            })}
            id="photo"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
          {errors.postPhoto && (
            <p className="text-red-500">{errors.postPhoto.message}</p>
          )}
          <div className="flex flex-col gap-5 w-full justify-center items-center">
            <div className="mt-3 flex flex-col gap-2 w-2/3">
              <label
                htmlFor="caption"
                className="text-subtext text-heading4-bold"
              >
                <p className="text-center">Name of Ads</p>
              </label>
              <input
                {...register("caption", {
                  required: "Required",
                  validate: (value) => {
                    if (value.length < 3) {
                      return "Must be more than 2 characters";
                    } else if (value.length > 50) {
                      return "Must be less than 50 characters";
                    }
                  },
                })}
                type="text"
                rows={5}
                className="w-full py-0.5 border resize-none rounded-full bg-[#ACA9BB20] px-2"
                id="caption"
              />

              {errors.caption && (
                <p className="text-red-500">{errors.caption.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-2/3">
              <label htmlFor="link">
                <p className="text-heading4-bold text-subtext text-center">
                  Link of Ads
                </p>
                <input
                  {...register("link", {
                    required: "Required",
                    pattern: {
                      value: /^https?:\/\/\S+$/i,
                      message:
                        "Please enter a valid URL starting with http:// or https://",
                    },
                  })}
                  type="text"
                  rows={5}
                  className="w-full py-0.5 border resize-none rounded-full bg-[#ACA9BB20] px-2"
                  placeholder="www.example.com"
                  id="link"
                />
              </label>
              {errors.link && (
                <p className="text-red-500">{errors.link.message}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-10">
            <div>
              <button
                type="submit"
                className="py-2.5 bg-[#f1592a] rounded-full px-5 text-white text-small-bold drop-shadow-md"
              >
                Create Ads
              </button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <p>500 Credits</p>
              <Image src="/assets/coin.svg" alt="coin" width={20} height={20} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateAds;
