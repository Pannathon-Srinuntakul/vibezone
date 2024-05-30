import mongoose from "mongoose";

const GuestSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
      unique:true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePhoto: {
        type:String,
        required: true,
        default: "/assets/guest.svg"
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    posts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
  },
  { timestamps: true }
);

const Guest = mongoose.models.Guest || mongoose.model("Guest", GuestSchema);

export default Guest;
