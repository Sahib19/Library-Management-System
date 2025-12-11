import express from "express";
import Issue from "../models/Issue.js";
import Book from "../models/Book.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const issues = await Issue.find()
    .populate("user", "name email")
    .populate("book", "title")
    .sort({ createdAt: -1 });
  res.json(issues);
});

router.post("/", async (req, res) => {
  try {
    const { user, book, dueAt } = req.body;
    if (!user || !book) return res.status(400).json({ message: "user and book are required" });

    const bookDoc = await Book.findById(book);
    if (!bookDoc) return res.status(404).json({ message: "Book not found" });
    if (bookDoc.availableCopies < 1) return res.status(409).json({ message: "No available copies" });

    bookDoc.availableCopies -= 1;
    await bookDoc.save();

    const issue = await Issue.create({
      user,
      book,
      dueAt: dueAt ? new Date(dueAt) : undefined,
    });

    res.status(201).json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to issue book" });
  }
});

router.patch("/:id/return", async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue record not found" });
    if (issue.status === "returned") return res.status(409).json({ message: "Already returned" });

    issue.status = "returned";
    issue.returnedAt = new Date();
    await issue.save();

    await Book.findByIdAndUpdate(issue.book, { $inc: { availableCopies: 1 } });

    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to return book" });
  }
});

export default router;

