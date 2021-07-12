const express = require("express");
const router = express.Router();

const User = require("../controller/userController");
const Attendence = require("../controller/attendenceController");

router.post("/register", User.register);
router.post("/login", User.login);
router.get("/getuser", User.getuser);
router.post("/takeAttend", Attendence.takeAttend);
router.post("/getAttend", Attendence.getAttend);
module.exports = router;
