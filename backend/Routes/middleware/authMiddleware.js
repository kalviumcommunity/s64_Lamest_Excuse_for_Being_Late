const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Try to get token from Authorization header first
  let token = req.header("Authorization")?.split(" ")[1];
  
  // If not in header, check cookies
  if (!token && req.cookies) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
