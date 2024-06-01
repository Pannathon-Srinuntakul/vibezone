import Guest from "@lib/models/Guest";
import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  const { query } = params;

  try {
    await connectToDB();

    const url = new URL(req.url);
    const offset = parseInt(url.searchParams.get("offset")) || 0;
    const limit = parseInt(url.searchParams.get("limit")) || 10;

    const posts = await Post.find({
      $or: [
        { caption: { $regex: query, $options: "i" } },
        { details: { $elemMatch: { $regex: query, $options: "i" } } },
      ],
    })
      .skip(offset)
      .limit(limit)
      .exec();

    const populatedPosts = await Promise.all(
      posts.map(async (post) => {
        let creator = null;
        if (post.creatorType === "User") {
          creator = await User.findById(post.creator).lean().exec();
        } else if (post.creatorType === "Guest") {
          creator = await Guest.findById(post.creator).lean().exec();
        }
        return {
          ...post.toObject(),
          creator,
        };
      })
    );

    return new Response(JSON.stringify(populatedPosts.reverse()), { status: 200 });
  } catch (error) {
    console.error("Error searching posts:", error);
    return new Response("Failed to search posts", { status: 500 });
  }
};
