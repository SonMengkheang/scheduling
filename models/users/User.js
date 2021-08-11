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
  username: {
    type: String,
    unique: true,
  },
  userImage: {
    type: String,
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
  freeTime: {
    monday : [{
      startTime : {
        type : Date
      },
      endTime : {
        type : Date
      },
      status : {
        type : Boolean,
        default : false
      },
      subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subject"
      },
      class : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Class"
      },
      room: {
        type : String
      },
      lectureType: {
        type: String
      },
      duration: {
        type: Number
      },
      shift: {
        type: String
      }
    }],
    tuesday : [{
      startTime : {
        type : Date
      },
      endTime : {
        type : Date
      },
      status : {
        type : Boolean,
        default : false
      },
      subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subject"
      },
      class : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Class"
      },
      room: {
        type : String
      },
      lectureType: {
        type: String
      },
      duration: {
        type: Number
      },
      shift: {
        type: String
      }
    }],
    wednesday : [{
      startTime : {
        type : Date
      },
      endTime : {
        type : Date
      },
      status : {
        type : Boolean,
        default : false
      },
      subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subject"
      },
      class : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Class"
      },
      room: {
        type : String
      },
      lectureType: {
        type: String
      },
      duration: {
        type: Number
      },
      shift: {
        type: String
      }
    }],
    thursday : [{
      startTime : {
        type : Date
      },
      endTime : {
        type : Date
      },
      status : {
        type : Boolean,
        default : false
      },
      subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subject"
      },
      class : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Class"
      },
      room: {
        type : String
      },
      lectureType: {
        type: String
      },
      duration: {
        type: Number
      },
      shift: {
        type: String
      }
    }],
    friday : [{
      startTime : {
        type : Date
      },
      endTime : {
        type : Date
      },
      status : {
        type : Boolean,
        default : false
      },
      subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subject"
      },
      class : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Class"
      },
      room: {
        type : String
      },
      lectureType: {
        type: String
      },
      duration: {
        type: Number
      },
      shift: {
        type: String
      }
    }],
    saturday : [{
      startTime : {
        type : Date
      },
      endTime : {
        type : Date
      },
      status : {
        type : Boolean,
        default : false
      },
      subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subject"
      },
      class : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Class"
      },
      room: {
        type : String
      },
      lectureType: {
        type: String
      },
      duration: {
        type: Number
      },
      shift: {
        type: String
      }
    }],
  }
},{ timestamps : true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
