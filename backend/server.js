const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./dataBase");// Import the database connection function
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ExcuseRoutes = require("./Routes/excuseRoutes"); // Import the correct routes file
const AuthRoutes = require("./Routes/authRoutes"); // Import the correct routes file

const authMiddleware = require('./Routes/middleware/authMiddleware'); 

const app = express();
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true // Allow cookies to be sent with requests
}));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/default", express.static(path.join(__dirname, "public/default")));

connectDB();

// *Home Route with DB Status*
app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: "Welcome to the API", db_status: status });
});

app.use("/api/excuses", authMiddleware, ExcuseRoutes);

// Apply authentication selectively in server.js
app.use("/api/auth/", AuthRoutes);


// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));