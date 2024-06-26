import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  const { query } = params;
  try {
    await connectToDB();

    const url = new URL(req.url);
    const offset = parseInt(url.searchParams.get("offset")) || 0; 
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    })
      .populate("posts savedPosts likedPosts")
      .skip(offset)
      .limit(limit)
      .exec();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error searching users:", error);
    return new Response("Failed to search users", { status: 500 });
  }
}
