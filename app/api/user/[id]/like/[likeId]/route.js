import { getAuth } from "@clerk/nextjs/server";
import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const POST = async (req, { params }) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await connectToDB();

    const userId = params.id;
    const likeId = params.likeId;

    const user = await User.findOne({ clerkId: userId })
      .populate("posts savedPosts")
      .populate({
        path: "likedPosts",
        model: "Post",
        populate: {
          path: "creator",
          model: "User",
        },
      });

    const post = await Post.findById(likeId).populate("creator likes");

    const isLiked = user.likedPosts.find(
      (item) => item._id.toString() === likeId
    );

    if (isLiked) {
      user.likedPosts = user.likedPosts.filter(
        (item) => item._id.toString() !== likeId
      );
      post.likes = post.likes.filter(
        (item) => item._id.toString() !== user._id.toString()
      );
    } else {
      user.likedPosts.push(post._id);
      post.likes.push(user._id);
    }

    await user.save();
    await post.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to like/dislike post", { status: 500 });
  }
};
