import Guest from "@lib/models/Guest";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  try {
    await connectToDB();
    const guest = await Guest.findOne({ username });
    const user = await User.findOne({ username });

    if (guest || user) {
      return new Response(JSON.stringify({ isTaken: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ isTaken: false }), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed to check username", { status: 500 });
  }
};
