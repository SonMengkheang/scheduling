const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class"
  },
  schedule: {
    monday : [{
        startTime : {
            type : Date
        },
        endTime : {
            type : Date
        },
        subject : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        type: {
            type: String
        },
        teacher : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        room : {
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
        subject : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        type: {
            type: String
        },
        teacher : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        room : {
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
        subject : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        type: {
            type: String
        },
        teacher : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        room : {
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
        subject : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        type: {
            type: String
        },
        teacher : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        room : {
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
        subject : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        type: {
            type: String
        },
        teacher : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        room : {
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
        subject : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        type: {
            type: String
        },
        teacher : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        room : {
            type: String
        }
    }]
}
},{timestamps : true}
)

const Schedule = mongoose.model("Schedule", scheduleSchema)
module.exports = Schedule