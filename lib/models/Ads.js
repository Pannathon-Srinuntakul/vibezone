import mongoose from "mongoose";

const AdsSchema = new mongoose.Schema({
creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  caption: {
    type: String,
    required: true,
  },
  postPhoto: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
},{timestamps: true})

const Ads = mongoose.models.Ads || mongoose.model("Ads", AdsSchema);

export default Ads;