import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getAuth } from "@clerk/nextjs/server";
import Ads from "@lib/models/Ads";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import { s3Client } from "@lib/s3/s3Client";

export const DELETE = async (req, { params }) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await connectToDB();

    const ads = await Ads.findById(params.id);

    if (!ads) {
      return new Response("Ads not found", { status: 404 });
    }

    const url = new URL(ads.postPhoto);
    const key = url.pathname.substring(1);

    const bucketParams = {
      Bucket: "framefeeling",
      Key: key,
    };

    try {
      await s3Client.send(new DeleteObjectCommand(bucketParams));
    } catch (err) {
      console.error("Failed to delete image file:", err);
    }
    await Ads.findByIdAndDelete(params.id);

    const user = await User.findByIdAndUpdate(
      params.creatorId,
      { $pull: { ads: params.id } },
      { new: true, useFindAndModify: false }
    ).exec();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to delete the post", { status: 500 });
  }
};
