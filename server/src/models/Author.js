import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Author", authorSchema);

