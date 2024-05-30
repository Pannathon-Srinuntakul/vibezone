import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    
    const user = await User.findOne({ clerkId: params.id })
    .populate({
      path: "posts savedPosts likedPosts",
      model: Post,
      populate: {
        path: "creator",
        model: User,
      },
    })
      .exec();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to get user", { status: 500 });
  }
};
