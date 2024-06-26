import { getAuth } from "@clerk/nextjs/server";
import Post from "@lib/models/Post";
import User from "@lib/models/User";
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
    
    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    if (reqBody.type === existingPost.frame) {
      return new Response(JSON.stringify("Frame type is already the same."), {
        status: 500,
      });
    }
    
    const updateFrame = await Post.findByIdAndUpdate(
      id,
      { frame: reqBody.type },
      { new: true }
    ).exec();


    if (!updateFrame) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    await User.findByIdAndUpdate(
      reqBody.userId,
      {
        $inc: { credit: -reqBody.credit },
      },
      { new: true, useFindAndModify: false }
    );

    return new Response(JSON.stringify(updateFrame), { status: 200 });
  } catch (error) {
    console.error("Error updating frame:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
