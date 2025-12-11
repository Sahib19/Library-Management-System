import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    issuedAt: { type: Date, default: Date.now },
    dueAt: { type: Date },
    returnedAt: { type: Date },
    status: { type: String, enum: ["issued", "returned"], default: "issued" },
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);

