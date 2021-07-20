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
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  duration : {
    type: Number
  },
  credit : {
    type: Number
  },
  hasLab: {
    type: Boolean
  },
  labDuration : {
    type: Number
  },
}, { timestamps: true }
)

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
