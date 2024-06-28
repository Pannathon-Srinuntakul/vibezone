import { getAuth } from "@clerk/nextjs/server";
import Post from "@lib/models/Post";
import { connectToDB } from "@lib/mongodb/mongoose";

export const PUT = async (req, { params }) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const id = params.id;

  try {
    await connectToDB();

    const reqBody = await req.json();
    const updateStatus = await Post.findByIdAndUpdate(
      id,
      { status: reqBody.newStatus },
      { new: true }
    ).exec();

    if (!updateStatus) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updateStatus), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
  }
};
