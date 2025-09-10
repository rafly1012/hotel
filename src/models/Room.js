import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
