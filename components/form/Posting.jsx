"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Posting = ({ post, apiEndpoint }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });

  const router = useRouter();

  const handlePublish = async (data) => {
    try {
      const postForm = new FormData();

      postForm.append("creatorId", post.creatorId);
      postForm.append("creatorType", post.creatorType);
      postForm.append("caption", data.caption);
      const details = Array(5).fill("");
      data.details.forEach((detail, index) => {
        details[index] = detail || "";
      });
      postForm.append("details", JSON.stringify(details));
      postForm.append("postPhoto", data.postPhoto[0]);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: postForm,
      });

      if (response.ok) {
        router.push(`/`)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col gap-7 pb-12 rounded-xl lg:w-1/2 bg-white drop-shadow-xl pt-12 px-5"
      onSubmit={handleSubmit(handlePublish)}
    >
      <div>
      <p className="text-end text-red-500 text-tiny-medium">*If you are not logged in, your post will be deleted within 24 hours.</p>
      <h1 className="text-center text-heading1-bold">Create post</h1>
      </div>
      <p className="w-full border border-subtext"></p>
      <div className="flex max-md:flex-col md:justify-between gap-5 md:gap-3">
        <div className="md:w-1/2">
          <div className="w-full">
            <label
              htmlFor="photo"
              className="flex flex-col justify-center items-center text-black cursor-pointer"
            >
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
        </div>
        <hr />
        <div className="md:border-l-2 md:border-subtext md:w-1/2 px-6 flex flex-col gap-5">
          <div>
            <label
              htmlFor="caption"
              className="text-subtext text-heading4-bold"
            >
              <p className="text-center">Name of post</p>
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
              className="w-full resize-none rounded-full bg-[#ACA9BB20] px-2"
              id="caption"
            />

            {errors.caption && (
              <p className="text-red-500">{errors.caption.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-heading4-bold text-subtext text-center">
              Detail
            </p>
            {[...Array(5)].map((_, index) => (
              <div key={index}>
                <label
                  htmlFor={`detail-${index}`}
                  className="text-subtext text-tiny-medium"
                >
                  {index + 1}
                </label>
                <input
                  {...register(`details[${index}]`, {
                    validate: (value) => {
                      if (value.length > 200) {
                        return "Must be less than 200 words";
                      }
                    },
                  })}
                  type="text"
                  placeholder="Not require"
                  className="w-full input bg-[#ACA9BB20] text-subtle-medium py-2 rounded-full px-2"
                />
                {errors.details && errors.details[index] && (
                  <p className="text-red-500">
                    {errors.details[index].message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2.5 mt-10 bg-[#ACA9BB20] rounded-full px-5 text-subtext text-small-bold drop-shadow-md"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Posting;
