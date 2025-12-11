import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).select("-passwordHash");
  res.json(users);
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role = "user", cnic, phone, gender } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, password required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role, cnic, phone, gender });
    res.status(201).json({ id: user._id, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to register user" });
  }
});

export default router;

