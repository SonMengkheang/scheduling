const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  teacherID: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: [{
    type: String,
    unique: true,
  }],
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  password: {
    type: String,
  },
  department: [{
    type: String,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
