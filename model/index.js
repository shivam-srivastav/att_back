const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  user_id: { type: String },
  email: { type: String },
  password: { type: String },
  roll_no: { type: String },
  role: { type: String },
  profile_pic: { type: Buffer },
});

const ClassroomSchema = new Schema({
  class_name: { type: String },
  associate_teacher: { type: String },
  students: { type: Array },
});

const AttendenceSchema = new Schema({
  userid: { type: String },
  img: { type: String },
  date: { type: String },
  data: { type: Array },
});

const User = mongoose.model("User", UserSchema);
const Classroom = mongoose.model("Classroom", ClassroomSchema);
const Attendence = mongoose.model("Attendence", AttendenceSchema);

module.exports = {
  User,
  Classroom,
  Attendence,
};
