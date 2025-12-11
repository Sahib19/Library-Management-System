import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
});

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });
    const existing = await Category.findOne({ name });
    if (existing) return res.status(409).json({ message: "Category already exists" });
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create category" });
  }
});

export default router;

