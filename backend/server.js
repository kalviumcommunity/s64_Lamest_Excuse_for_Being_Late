// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

require("dotenv").config();
const cors = require("cors");
const connectDB = require("./dataBase");// Import the database connection function
const express = require("express");
const mongoose = require("mongoose");
const ExcuseRoutes = require("./Routes/excuseRoutes"); // Import the correct routes file
const AuthRoutes = require("./Routes/authRoutes"); // Import the correct routes file

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// *Home Route with DB Status*
app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: "Welcome to the API", db_status: status });
});

app.use("/api/excuses", ExcuseRoutes);

app.use("/api/auth", AuthRoutes );

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));







