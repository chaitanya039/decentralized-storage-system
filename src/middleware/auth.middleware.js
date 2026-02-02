const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlacklistedToken");

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  // 🔴 Check blacklist
  const blacklisted = await BlacklistedToken.findOne({ token });
  if (blacklisted)
    return res.status(401).json({ message: "Token expired (logged out)" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
