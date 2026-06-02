require("dotenv").config();
const jwt = require("jsonwebtoken");
const user_model = require("../src/models/TC");

// Middleware for handling auth
async function student_auth(req, res, next) {
  try {
    const token = req.cookies?.token || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
    
    if (!token) {
      return res.status(401).json({ message: "Student is not logged in", success: false });
    }
    
    const jwtPassword = process.env.SECRET_KEY;
    const decode = jwt.verify(token, jwtPassword);
    
    let user = await user_model
      .findOne({ _id: decode.id })
      .select("-student_password -auth_key")
      .exec();
      
    if (!user) {
      return res.status(403).json({ message: "Student record not found", success: false });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.log("Student Auth Error:", error.message);
    return res.status(401).json({
      message: "Authentication failed: " + (error.message || "Invalid token"),
      success: false,
    });
  }
}

module.exports = student_auth;