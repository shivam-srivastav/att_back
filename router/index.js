const upload = require('../config/storage')
const express = require("express");
const router = express.Router();

const User = require("../controller/userController");
const Attendence = require("../controller/attendenceController");
const uploadControler = require('../controller/uploadController')
router.post("/register", User.register);
router.post("/login", User.login);
router.get("/getuser", User.getuser);
router.post("/takeAttend", Attendence.takeAttend);
router.post("/getAttend", Attendence.getAttend);
router.post('/manageStudent', Attendence.manageStudent);
router.post('/photo',upload.single('image'), uploadControler.UploadImage);
router.post('getPhoto', uploadControler.GetImages);
module.exports = router;
