import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getAuth } from "@clerk/nextjs/server";
import Ads from "@lib/models/Ads";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import { s3Client } from "@lib/s3/s3Client";

export const POST = async (req) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await connectToDB();

    const data = await req.formData();

    let postPhoto = data.get("postPhoto");
    const creatorId = data.get("creatorId");

    const bytes = await postPhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const newFileName = `${Date.now()}_${[postPhoto.name]}`;

    const bucketParams = {
      Bucket: "framefeeling",
      Key: `ads/${newFileName}`,
      Body: buffer,
      ACL: "public-read",
    };

    await s3Client.send(new PutObjectCommand(bucketParams));

    postPhoto = `https://framefeeling.sgp1.cdn.digitaloceanspaces.com/${bucketParams.Key}`;

    const newPost = await Ads.create({
      creator: creatorId,
      caption: data.get("caption"),
      link: data.get("link"),
      postPhoto: postPhoto,
    });

    await newPost.save();

    const deletePostAfterTimeout = async (postId) => {
      try {
        setTimeout(async () => {
          await connectToDB(); // Ensure the database connection is active
          const deletedPost = await Ads.findByIdAndDelete(postId);
          if (deletedPost) {
            await User.findByIdAndUpdate(
              deletedPost.creatorId,
              { $pull: { ads: postId } },
              { new: true, useFindAndModify: false }
            );

            await s3Client.send(new DeleteObjectCommand(bucketParams));
          } else {
            console.log("Post not found or already deleted:", postId);
          }
        }, 604800000); // 1 day = 86400000 milliseconds
      } catch (error) {
        console.error("Error deleting post after timeout:", error);
      }
    };

    await User.findByIdAndUpdate(
      creatorId,
      {
        $push: { ads: newPost._id },
        $inc: { credit: -500 },
      },
      { new: true, useFindAndModify: false }
    );
    deletePostAfterTimeout(newPost._id);

    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
