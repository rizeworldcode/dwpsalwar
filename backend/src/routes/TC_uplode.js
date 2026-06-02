const express = require("express");
const router = express.Router();
const user_auth = require("../../middleware/user_auth");
const student_auth = require("../../middleware/student_auth");
const multer_photo = require("../../middleware/multer");

const any_auth = require("../../middleware/any_auth");

const {
TC_uplode,TC_delete,TC_view,updateTc
} = require("../controllers/TC_uplode");

router.post(
  "/TC_uplode",
  user_auth,
  multer_photo.fields([
    { name: "TC_photo", maxCount: 1 }
  ]),
 TC_uplode
);
router.post(
  "/TC_delete",user_auth,TC_delete
);
router.get(
  "/TC_view/:student_ID",any_auth,TC_view
);

router.post(
  "/update-tc/:student_iD",
  user_auth,
  updateTc
);

module.exports = router;