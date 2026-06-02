require("dotenv").config();
const jwt = require("jsonwebtoken");
const user_model = require("../src/models/adminModel");

// Middleware for handling auth
async function user_auth(req, res, next) {
  try {
    const token = req.cookies?.token || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
    
    if (!token) {
      return res.status(401).json({ message: "User is not logged in", success: false });
    }
    
    const jwtPassword = process.env.SECRET_KEY;
    const decode = jwt.verify(token, jwtPassword);
    
    let user = await user_model
      .findOne({ _id: decode.id })
      .select("-password -auth_key -notificationToken")
      .exec();
      
    if (!user) {
      return res.status(403).json({ message: "User not found", success: false });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({
      message: "Authentication failed: " + (error.message || "Invalid token"),
      success: false,
    });
  }
}

module.exports = user_auth;