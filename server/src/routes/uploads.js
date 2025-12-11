import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/cover", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "library-covers" }, (error, uploadResult) => {
        if (error) return reject(error);
        resolve(uploadResult);
      });
      stream.end(req.file.buffer);
    });

    res.status(201).json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

export default router;
