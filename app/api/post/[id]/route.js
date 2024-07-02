import { getAuth } from "@clerk/nextjs/server";
import Post from "@lib/models/Post";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await connectToDB();

    const post = await Post.findById(params.id)
      .populate({
        path: "creator",
        model: "User",
        select: "-email -credit",
      })
      .exec();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to get post", { status: 500 });
  }
};
