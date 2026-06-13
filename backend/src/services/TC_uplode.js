const Tc_model = require("../models/TC");
const path = require('path');
const fs = require('fs');

exports.TC_uplode = async (req, res) => {
    try {
        const { student_name, student_ID, status, TC_number } = req.body;

        // Main Photo
        let TC_photo = "";

        if (
            req.files &&
            req.files["TC_photo"] &&
            req.files["TC_photo"].length > 0
        ) {
            // store DB path relative to public (so file is reachable at /uploads/<filename>)
            TC_photo = `uploads/${req.files["TC_photo"][0].filename}`;
        }

        // Validate inputs
        if (!TC_number) {
            return {
                message: "TC number is required",
                success: false,
            };
        }

        const existingStudentTc = await Tc_model.findOne({ student_ID: student_ID });
        if (existingStudentTc) {
            return {
                message: "student TC already exists",
                success: false,
            };
        }

        // Check if TC number already exists
        const existingTcNumber = await Tc_model.findOne({ TC_number: TC_number });
        if (existingTcNumber) {
            return {
                message: "TC number already exists",
                success: false,
            };
        }

        const TC_Data = new Tc_model({ student_name, student_ID, status, TC_photo, TC_number });
        if (!TC_Data) {
            return {
                message: "student TC upload failed",
                success: false,
            };
        }

        // Persist to database
        const saved = await TC_Data.save();

        return {
            TC_Data: saved,
            message: "student TC uploaded successfully",
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            message: error.message || "Internal server error",
            success: false,
        };
    }
}

exports.TC_delete = async (req, res) => {
    try {
        const {student_ID} = req.body
        const tc_data = await Tc_model.findOne({student_ID})

        if(tc_data.TC_photo){
                       const filePath = path.join(
        __dirname,
        "..",
        "public",
        tc_data.TC_photo
      );

      try {
        await fs.unlink(filePath);
        console.log("Photo deleted successfully");
      } catch (err) {
        console.log("Photo already deleted or not found");
      }
        }



        const delete_tc = await Tc_model.findOneAndDelete({student_ID})
        if(!delete_tc){
            return{
                message:"TC not delete ",
                success:false,
            }
        }
        return{
            message:"TC delete successfully",
            success:true
        }
    } catch (error) {
        console.log(error);
        return {
            message: error.message || "Internal server error",
            success: false,
        };
    }
}

exports.TC_view = async (req,res)=>{
  const { student_ID } = req.params || {};
  try {
    // Accept either the external student_ID (e.g., DWPS2026001) or a Mongo ObjectId
    let tc_data = null;
    try {
      const mongoose = require('mongoose');
      if (mongoose.isValidObjectId(student_ID)) {
        tc_data = await Tc_model.findById(student_ID);
      }
    } catch (innerErr) {
      // ignore mongoose require errors and fallback to lookup by student_ID
    }

    if (!tc_data) {
      tc_data = await Tc_model.findOne({ student_ID });
    }

    if(!tc_data){
      return{
        message:"tc not found",
        success:false
      }
    }

    return{
      tc_data,
      TC:tc_data.TC_photo,
      message:"tc fetch successfully",
      success:true
    }
  } catch (error) {
    console.log(error);
    return{
      message:error.message || "Internal server error",
      success: false,
    }
  }
}

exports.updateTc = async (req, res) => {
  try {
    const { student_iD } = req.params || {};

    const {
      TC_number,
      status,
    } = req.body;

    // Find existing TC by student_ID (model stores student_ID)
    const existingTc = await Tc_model.findOne({ student_ID: student_iD });

    if (!existingTc) {
      return {
        success: false,
        message: "TC not found",
      };
    }

    // Update TC number if provided
    if (TC_number) {
      // Check if new TC number is already used by another record
      const existingWithTcNumber = await Tc_model.findOne({
        TC_number,
        _id: { $ne: existingTc._id }
      });
      if (existingWithTcNumber) {
        return {
          success: false,
          message: "TC number already exists",
        };
      }
      existingTc.TC_number = TC_number;
    }

    existingTc.status = status || existingTc.status;
    existingTc.updated_at = Date.now();

    await existingTc.save();

    return {
      success: true,
      message: 'TC updated successfully',
      data: existingTc,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Internal server error',
    };
  }
};