import Guest from "@lib/models/Guest";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    
    const guest = await Guest.findOne({ ipAddress: params.id })
      .exec();

    return new Response(JSON.stringify(guest), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to get guest", { status: 500 });
  }
};
