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
  department: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Department"
  }],
  classes: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Classes"
  }],
  subject : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Subject"
  }],
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
      }
    }],
  }
},{ timestamps : true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;