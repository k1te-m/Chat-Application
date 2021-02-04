const config = require("config");
const jwt = require("jsonwebtoken");

let jwtENV;

if (process.env.NODE_ENV !== "production") {
  jwtENV = config.get("jwtSecret");
} else {
  jwtENV = process.env.JWT_SECRET;
}

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtENV);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
