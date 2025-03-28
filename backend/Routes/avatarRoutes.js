const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../Model/authModel");
const authMiddleware = require("./middleware/authMiddleware.js");

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "../public/uploads/avatars");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter for image files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  }
});

// Upload avatar route
router.post("/upload", authMiddleware, upload.single("avatar"), async (req, res) => {
  try {
    // No file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Create the public URL for the avatar
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    
    // Update user's avatar in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { new: true }
    ).select("-password");

    res.json({
      message: "Avatar uploaded successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;