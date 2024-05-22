import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    credit: {
      type: Number,
      default: 0,
    },
    posts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    savedPosts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    likedPosts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
