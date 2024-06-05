import Post from "@lib/models/Post";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id)
      .populate({
        path: "creator",
        model: "User",
      })
      .exec();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to get post", { status: 500 });
  }
};
