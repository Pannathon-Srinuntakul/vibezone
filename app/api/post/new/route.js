import Guest from "@lib/models/Guest";
import Post from "@lib/models/Post";
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
    const newFileName = `${Date.now()}_${fileExtension}`;

    const postPhotoPath = path.join(
      currentWorkingDirectory,
      "public",
      "uploads",
      newFileName
    );

    await writeFile(postPhotoPath, buffer);

    postPhoto = `/uploads/${newFileName}`;

    const details = JSON.parse(data.get("details"));

    const newPost = await Post.create({
      creator: creatorId,
      creatorType: data.get("creatorType"),
      caption: data.get("caption"),
      details: details,
      postPhoto: postPhoto,
    });

    await newPost.save();

    const deletePostAfterTimeout = async (postId) => {
      try {
        setTimeout(async () => {
          await connectToDB(); // Ensure the database connection is active
          const deletedPost = await Post.findByIdAndDelete(postId);
          if (deletedPost) {
            if (deletedPost.creatorType === "Guest") {
              await Guest.findByIdAndUpdate(
                deletedPost.creatorId,
                { $pull: { posts: postId } },
                { new: true, useFindAndModify: false }
              );
            }

            // Delete the associated image file
            const imagePath = path.join(currentWorkingDirectory, "public", deletedPost.postPhoto);
            await unlink(imagePath);

          } else {
            console.log("Post not found or already deleted:", postId);
          }
        }, 86400000); // 1 day = 86400000 milliseconds
      } catch (error) {
        console.error("Error deleting post after timeout:", error);
      }
    };

    if (data.get("creatorType") === "User") {
      await User.findByIdAndUpdate(
        creatorId,
        { $push: { posts: newPost._id } },
        { new: true, useFindAndModify: false }
      );
    } else if (data.get("creatorType") === "Guest") {
      await Guest.findByIdAndUpdate(
        creatorId,
        { $push: { posts: newPost._id } },
        { new: true, useFindAndModify: false }
      );
      deletePostAfterTimeout(newPost._id);
    }

    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
