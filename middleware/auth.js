const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET); // Remove "Bearer " before verifying
    req.user = decoded; // Attach the decoded token (which includes userId) to req.user
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

