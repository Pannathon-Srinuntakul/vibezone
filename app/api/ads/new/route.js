import Ads from "@lib/models/Ads";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import { writeFile, unlink } from "fs/promises";

export const POST = async (req) => {
  const path = require("path");
  const currentWorkingDirectory = process.cwd();

  try {
    await connectToDB();

    const data = await req.formData();

    let postPhoto = data.get("postPhoto");
    const creatorId = data.get("creatorId");

    const bytes = await postPhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a new file name with the creatorId
    const fileExtension = path.extname(postPhoto.name);
    const newFileName = `${creatorId}_${Date.now()}${fileExtension}`;

    const postPhotoPath = path.join(
      currentWorkingDirectory,
      "public",
      "ads",
      newFileName
    );

    await writeFile(postPhotoPath, buffer);

    postPhoto = `/ads/${newFileName}`;

    const newPost = await Ads.create({
      creator: creatorId,
      caption: data.get("caption"),
      link: data.get("link"),
      postPhoto: postPhoto,
    });

    await newPost.save();

    const deletePostAfterTimeout = async (postId) => {
      try {
        setTimeout(async () => {
          await connectToDB(); // Ensure the database connection is active
          const deletedPost = await Ads.findByIdAndDelete(postId);
          if (deletedPost) {
            await User.findByIdAndUpdate(
              deletedPost.creatorId,
              { $pull: { ads: postId } },
              { new: true, useFindAndModify: false }
            );

            const imagePath = path.join(
              currentWorkingDirectory,
              "public",
              deletedPost.postPhoto
            );
            await unlink(imagePath);

          } else {
            console.log("Post not found or already deleted:", postId);
          }
        }, 86400000); // 1 day = 86400000 milliseconds
      } catch (error) {
        console.error("Error deleting post after timeout:", error);
      }
    };

    await User.findByIdAndUpdate(
      creatorId,
      {
        $push: { ads: newPost._id },
        $inc: { credit: -500 },
      },
      { new: true, useFindAndModify: false }
    );
    deletePostAfterTimeout(newPost._id);

    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
