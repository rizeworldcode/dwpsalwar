const express = require("express");
const router = express.Router();
// const user_auth = require("../../middleware/user_auth");

const {
admin_login,verifyOtp,admin_forgatePassword,admin_logout,sendOtpTOadmin
} = require("../controllers/adminValidation");

router.post("/sendOtpTOadmin", sendOtpTOadmin);
router.post("/verifyOtp", verifyOtp);
router.post("/admin_login", admin_login);
router.post("/admin_forgatePassword", admin_forgatePassword);
router.post("/admin_logout", admin_logout);
// router.post("/userID",user_auth, userID);

module.exports = router;