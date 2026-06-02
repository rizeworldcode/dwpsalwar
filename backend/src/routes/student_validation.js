const express = require("express");
const router = express.Router();


const {
student_login,student_logout
} = require("../controllers/student_validation");


router.post("/student_login", student_login);
router.post("/student_logout", student_logout);


module.exports = router;