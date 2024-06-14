import Guest from "@lib/models/Guest";
import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import { s3Client } from "@lib/s3/s3Client";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

export const POST = async (req) => {
  try {
    await connectToDB();

    const data = await req.formData();

    let postPhoto = data.get("postPhoto");
    const creatorId = data.get("creatorId");

    const fileType = postPhoto.type;
    if (!fileType.startsWith("image/")) {
      return new Response(JSON.stringify({ error: "Image Only!!!" }), { status: 400 });
    }

    const bytes = await postPhoto.arrayBuffer();
    let buffer = Buffer.from(bytes);

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (buffer.length > maxSize) {
      buffer = await sharp(buffer)
        .resize(1500, 1500, {
          fit: sharp.fit.inside,
          withoutEnlargement: true
        })
        .toBuffer();
    }

    const newFileName = `${Date.now()}_${postPhoto.name}`;

    const bucketParams = {
      Bucket: "framefeeling",
      Key: `uploads/${newFileName}`,
      Body: buffer,
      ACL: "public-read",
    };

    await s3Client.send(new PutObjectCommand(bucketParams));

    postPhoto = `https://framefeeling.sgp1.cdn.digitaloceanspaces.com/${bucketParams.Key}`;

    const details = JSON.parse(data.get("details"));

    const newPost = await Post.create({
      creator: creatorId,
      creatorType: data.get("creatorType"),
      caption: data.get("caption"),
      details: details,
      postPhoto: postPhoto,
    });

    await newPost.save();

    const deletePostAfterTimeout = async (postId) => {
      try {
        setTimeout(async () => {
          await connectToDB(); // Ensure the database connection is active
          const deletedPost = await Post.findByIdAndDelete(postId);
          if (deletedPost) {
            if (deletedPost.creatorType === "Guest") {
              await Guest.findByIdAndUpdate(
                deletedPost.creatorId,
                { $pull: { posts: postId } },
                { new: true, useFindAndModify: false }
              );
            }

            await s3Client.send(new DeleteObjectCommand(bucketParams));
          } else {
            console.log("Post not found or already deleted:", postId);
          }
        }, 86400000); // 1 day = 86400000 milliseconds
      } catch (error) {
        console.error("Error deleting post after timeout:", error);
      }
    };

    if (data.get("creatorType") === "User") {
      await User.findByIdAndUpdate(
        creatorId,
        { $push: { posts: newPost._id } },
        { new: true, useFindAndModify: false }
      );
    } else if (data.get("creatorType") === "Guest") {
      await Guest.findByIdAndUpdate(
        creatorId,
        { $push: { posts: newPost._id } },
        { new: true, useFindAndModify: false }
      );
      deletePostAfterTimeout(newPost._id);
    }

    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
