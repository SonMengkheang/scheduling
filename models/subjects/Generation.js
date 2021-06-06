const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const generationSchema = new Schema({
  year: {
    type: String 
  },
  generation: {
    type: Number 
  },
  generationName: {
    type: String 
  },
  startedYear: {
    type: Date 
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },
  subject: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  }],
}, { timestamps : true }
);

const Generation = mongoose.model("Generation", generationSchema);
module.exports = Generation;
