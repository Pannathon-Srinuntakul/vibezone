import Guest from "@lib/models/Guest";
import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import fs from "fs/promises";
import path from "path";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id);

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    const currentWorkingDirectory = process.cwd();
    const imagePath = path.join(
      currentWorkingDirectory,
      "public",
      post.postPhoto
    );

    try {
      await fs.unlink(imagePath);
    } catch (err) {
      console.error("Failed to delete image file:", err);
      // Handle error but continue deleting post
    }
    await Post.findByIdAndDelete(params.id);

    const user = await User.findByIdAndUpdate(
      params.creatorId,
      { $pull: { posts: params.id } },
      { new: true, useFindAndModify: false }
    )
      .populate("posts savedPosts likedPosts")
      .exec();

    if (!user) {
      const guest = await Guest.findByIdAndUpdate(
        params.creatorId,
        { $pull: { posts: params.id } },
        { new: true, useFindAndModify: false }
      ).exec();
      if (!guest) {
        return new Response("Creator not found", { status: 404 });
      }
      return new Response(JSON.stringify(guest), { status: 200 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to delete the post", { status: 500 });
  }
};
