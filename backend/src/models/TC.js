const mongoose = require("mongoose");
const { type } = require("node:os");

const TcSchema = new mongoose.Schema({

    student_name: {
        type: String,
        required: true,
    },
    student_ID: {
        type: String,
        required: true,
    },
    student_password:{
        type:String,
        required: true,
    },
      auth_key: {
    type: String,
    default: null,
  },
    status: {
        type: String,
        required: true,
        default: "unActive",
    },
    TC_photo: {
        type: String,
        default: "",
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

const Tc = mongoose.model("Tc", TcSchema);
module.exports = Tc;
