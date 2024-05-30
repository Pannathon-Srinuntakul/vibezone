import Guest from "@lib/models/Guest";
import { connectToDB } from "@lib/mongodb/mongoose";

export const POST = async (req) => {
  try {
    await connectToDB();

    const data = await req.formData();

    const newGuest = await Guest.create({
      ipAddress: data.get("ipAddress"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      username: data.get("username"),
    });

    await newGuest.save();

    return new Response(JSON.stringify(newGuest), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new Guest", { status: 500 });
  }
};
