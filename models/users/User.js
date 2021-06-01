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
  subject : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Subject"
  }],
  freeTime: {
    monday : [{
      time : {
        type : Date
      }
    }],
    tuesday : [{
      time : {
        type : Date
      }
    }],
    wednesday : [{
      time : {
        type : Date
      }
    }],
    thursday : [{
      time : {
        type : Date
      }
    }],
    friday : [{
      time : {
        type : Date
      }
    }],
    saturday : [{
      time : {
        type : Date
      }
    }],
  },
},{ timestamps : true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
