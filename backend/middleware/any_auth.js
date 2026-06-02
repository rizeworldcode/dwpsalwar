require("dotenv").config();
const jwt = require("jsonwebtoken");
const admin_model = require("../src/models/adminModel");
const student_model = require("../src/models/TC");

async function any_auth(req, res, next) {
  try {
    const token = req.cookies?.token || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
    
    if (!token) {
      return res.status(401).json({ message: "Not logged in", success: false });
    }
    
    const jwtPassword = process.env.SECRET_KEY;
    const decode = jwt.verify(token, jwtPassword);
    
    // Try admin first
    let user = await admin_model.findById(decode.id).select("-password -auth_key").exec();
    
    if (!user) {
      // Try student
      user = await student_model.findById(decode.id).select("-student_password -auth_key").exec();
      if (user) {
        req.userType = 'student';
      }
    } else {
      req.userType = 'admin';
    }
      
    if (!user) {
      return res.status(403).json({ message: "User not found", success: false });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.log("Any Auth Error:", error.message);
    return res.status(401).json({
      message: "Authentication failed: " + (error.message || "Invalid token"),
      success: false,
    });
  }
}

module.exports = any_auth;