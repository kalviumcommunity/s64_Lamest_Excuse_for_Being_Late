const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./dataBase"); // Import the database connection function
const menuRoutes = require("./routes"); // Import the correct routes file

const app = express();

// Connect to the database
connectDB();

// Middleware for parsing JSON requests
app.use(express.json()); // Ensures handling of JSON request bodies

// Ping route (testing)
app.get("/ping", (req, res) => {
  try {
    res.send("pong");
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

// *Home Route with DB Status*
app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: "Welcome to the API", db_status: status });
});

// Use the routes defined in routes.js
app.use("/api", menuRoutes); // 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});