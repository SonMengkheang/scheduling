const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yearSchema = new Schema({
  year: {
    type: number
  },
  department: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Department"
  },
  subject: [{
    type: mongoose.Schema.Types.ObjectId;
    ref: "Subject"
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Year = mongoose.model("Year", yearSchema);
module.exports = Year;
