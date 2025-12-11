import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const books = await Book.find()
    .populate("author", "name")
    .populate("category", "name")
    .sort({ createdAt: -1 });
  res.json(books);
});

router.post("/", async (req, res) => {
  try {
    const { title, author, category, isbn, totalCopies = 1, coverUrl } = req.body;
    if (!title || !author || !category) {
      return res.status(400).json({ message: "title, author, category are required" });
    }
    const availableCopies = totalCopies;
    const book = await Book.create({ title, author, category, isbn, totalCopies, availableCopies, coverUrl });
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.isbn) {
      return res.status(409).json({ message: "A book with this ISBN already exists." });
    }
    res.status(500).json({ message: "Failed to create book" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const book = await Book.findByIdAndUpdate(id, update, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update book" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete book" });
  }
});

export default router;

