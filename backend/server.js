require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Error: ", err));

// User Schema
const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email: {
     type: String,
     unique: true 
    },
  password: String,
},{timestamps: true});
const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get User Route
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
