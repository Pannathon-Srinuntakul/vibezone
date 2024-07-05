import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    creatorType: {
      type: String,
      enum: ["User", "Guest"],
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    postPhoto: {
      type: String,
      required: true,
    },
    details: {
      type: [String],
      default: ["", "", "", "", ""],
      required: true,
    },
    frame: {
      type: String,
      enum: ["Purple", "Green", "Blue", "Pink", "Yellow", "", "Black", "Pride"],
      default: ""
    },
    status: {
      type: String,
      enum: ["Public", "Private",],
      default: "Public"
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
