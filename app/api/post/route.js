import Post from "@lib/models/Post";
import User from "@lib/models/User";
import Guest from "@lib/models/Guest";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req) => {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const offset = parseInt(url.searchParams.get("offset")) || 0;
    const limitParam = parseInt(url.searchParams.get("limit")) || 10;
    const limit = limitParam ? parseInt(limitParam) : null;

    const query = Post.find().sort({ createdAt: -1 }).skip(offset);
    if (limit !== null) {
      query.limit(limit);
    }
    const feedPosts = await query.exec();

    const populatedPosts = await Promise.all(
      feedPosts.map(async (post) => {
        let creator = null;
        if (post.creatorType === "User") {
          creator = await User.findById(post.creator).select("-email -credit").lean().exec(); // Exclude 'email' field
        } else if (post.creatorType === "Guest") {
          creator = await Guest.findById(post.creator).select("-ipAddress").lean().exec(); // Exclude 'ipAddress' field
        }
        return {
          ...post.toObject(),
          creator,
        };
      })
    );

    return new Response(JSON.stringify(populatedPosts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all Feed Posts", { status: 500 });
  }
};
