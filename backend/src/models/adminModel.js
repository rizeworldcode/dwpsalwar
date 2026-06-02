const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
  },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  auth_key: {
    type: String,
    default: null,
  },
  notificationToken: {
    type: String,
    default: null,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
