const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../Model/authModel"); // Ensure this model is correct
const fs = require("fs");
const path = require("path");

dotenv.config(); // Load environment variables

// Create default avatar directory if it doesn't exist
const avatarDir = path.join(__dirname, "../public/default");
if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}

// Function to set a default avatar from local storage
let avatarCounter = 1;

const generateAvatar = () => {
  avatarCounter = avatarCounter + 1;
  if (avatarCounter > 3) avatarCounter = 1;
  return `/default/${avatarCounter}.jpg`;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars, one uppercase, one number

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!emailRegex.test(email)) {  // Email format validation
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!passwordRegex.test(password)) {  // Password strength validation
      return res.status(400).json({
        error: "Password must be at least 8 characters long, include at least one uppercase letter and one number.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar: generateAvatar() // Assign public URL path to avatar
    });
    
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!emailRegex.test(email)) {  // Email validation
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    // Return both token and user info (excluding password)
    res.json({ 
      token, 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Users Route
router.get("/users", async (req, res) => {
  try {
    // Check if we're querying by email
    const email = req.query.email;
    
    if (email) {
      // If email is provided, find that specific user
      const user = await User.findOne({ email }).select("-password");
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    } else {
      // If no email, return all users
      const users = await User.find().select("-password"); // Exclude passwords
      return res.json(users);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get User by ID Route
router.get("/users/:id", async (req, res) => {
  try {
    console.log("User ID received:", req.params.id);

    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// During signup it checks whether the username is unique or not.
router.get("/check-username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const existingUser = await User.findOne({ name: username });

    if (existingUser) {
      return res.json({ available: false });
    } else {
      return res.json({ available: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;