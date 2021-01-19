const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  subjectCode: {
    type: String,
    unique: true
  }, 
  subjectName: {
    type: String
  },
  department: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Department"
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
