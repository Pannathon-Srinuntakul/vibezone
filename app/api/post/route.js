import Post from "@lib/models/Post";
import User from "@lib/models/User";
import Guest from "@lib/models/Guest";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req) => {
  try {
    await connectToDB();

    const feedPosts = await Post.find().exec();

    const populatedPosts = await Promise.all(
      feedPosts.map(async (post) => {
        let creator = null;
        if (post.creatorType === 'User') {
          creator = await User.findById(post.creator).lean().exec();
        } else if (post.creatorType === 'Guest') {
          creator = await Guest.findById(post.creator).lean().exec();
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
