import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import authorRoutes from "./routes/authors.js";
import categoryRoutes from "./routes/categories.js";
import bookRoutes from "./routes/books.js";
import issueRoutes from "./routes/issues.js";
import uploadRoutes from "./routes/uploads.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || "";

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/uploads", uploadRoutes);

async function ensureDefaultAdmin() {
  const email = "admin@library.com";
  const password = "Admin@123";

  const existingByEmail = await User.findOne({ email });
  if (existingByEmail) {
    const passwordHash = await bcrypt.hash(password, 10);
    existingByEmail.role = "admin";
    existingByEmail.passwordHash = passwordHash;
    await existingByEmail.save();
    console.log(`Default admin ensured at ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({
    name: "Admin",
    email,
    passwordHash,
    role: "admin",
  });
  console.log(`Seeded default admin user: ${email} / ${password}`);
}

const start = async () => {
  if (!MONGO_URI) {
    console.error("Missing MONGODB_URI in .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB connected");

    await ensureDefaultAdmin();

    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

start();

