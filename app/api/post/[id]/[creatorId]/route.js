import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getAuth } from "@clerk/nextjs/server";
import Guest from "@lib/models/Guest";
import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import { s3Client } from "@lib/s3/s3Client";

export const DELETE = async (req, { params }) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await connectToDB();

    const post = await Post.findById(params.id);

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    const url = new URL(post.postPhoto);
    const key = url.pathname.substring(1);

    const bucketParams = {
      Bucket: "framefeeling",
      Key: key,
    };

    try {
      await s3Client.send(new DeleteObjectCommand(bucketParams))
      
    } catch (err) {
      console.error("Failed to delete image file:", err);
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
