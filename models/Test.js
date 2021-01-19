const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
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
    type: String,
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

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
