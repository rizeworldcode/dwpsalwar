const {TC_uplode,TC_delete,TC_view,updateTc } = require("../services/TC_uplode")

exports.TC_uplode = async (req, res) => {
    try {
      const data = await TC_uplode(req, res);
      if (data.success) {
        res.status(200).json(data);
      }
      else{
          res.status(403).json(data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
exports.TC_delete = async (req, res) => {
    try {
      const data = await TC_delete(req, res);
      if (data.success) {
        res.status(200).json(data);
      }
      else{
          res.status(403).json(data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
exports.TC_view = async (req, res) => {
    try {
      const data = await TC_view(req, res);
      if (data.success) {
        res.status(200).json(data);
      }
      else{
          res.status(403).json(data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
exports.updateTc= async (req, res) => {
    try {
      const data = await updateTc(req, res);
      if (data.success) {
        res.status(200).json(data);
      }
      else{
          res.status(403).json(data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };