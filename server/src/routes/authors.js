import express from "express";
import Author from "../models/Author.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const authors = await Author.find().sort({ createdAt: -1 });
  res.json(authors);
});

router.post("/", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });
    const existing = await Author.findOne({ name });
    if (existing) return res.status(409).json({ message: "Author already exists" });
    const author = await Author.create({ name, bio });
    res.status(201).json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create author" });
  }
});

export default router;

