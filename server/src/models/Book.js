import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    isbn: { type: String, unique: true, sparse: true },
    totalCopies: { type: Number, default: 1 },
    availableCopies: { type: Number, default: 1 },
    coverUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);

