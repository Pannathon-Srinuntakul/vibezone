import Ads from "@lib/models/Ads";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import fs from "fs/promises";
import path from "path";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const ads = await Ads.findById(params.id);

    if (!ads) {
      return new Response("Ads not found", { status: 404 });
    }

    const currentWorkingDirectory = process.cwd();
    const imagePath = path.join(
      currentWorkingDirectory,
      "public",
      ads.postPhoto
    );

    try {
      await fs.unlink(imagePath);
    } catch (err) {
      console.error("Failed to delete image file:", err);
    }
    await Ads.findByIdAndDelete(params.id);

    const user = await User.findByIdAndUpdate(
      params.creatorId,
      { $pull: { ads: params.id } },
      { new: true, useFindAndModify: false }
    )
      .exec();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to delete the post", { status: 500 });
  }
};
