import { getAuth } from "@clerk/nextjs/server";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const PUT = async (req, { params }) => {
  const {userId} = getAuth(req)

  if (!userId) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401 }
    );
  }
  
  const id = params.id;

  try {
    await connectToDB();
    
    const reqBody = await req.json();
    
    const updateBio = await User.findByIdAndUpdate(id, { bio: reqBody.bio }, { new: true }).exec();

    if (!updateBio) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    
    return new Response(JSON.stringify(updateBio), { status: 200 });
  } catch (error) {
    console.error("Error updating bio:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
