const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        unique: true
    },
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    generationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Generation"
    },
    semester: {
        type: Number
    },
    semesterDate: {
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    },
    finalExamDate: {
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
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
            },
            duration: {
                type: Number
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
            },
            duration: {
                type: Number
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
            },
            duration: {
                type: Number
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
            },
            duration: {
                type: Number
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
            },
            duration: {
                type: Number
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
            },
            duration: {
                type: Number
            }
        }]
}
},{timestamps : true}
)

const Schedule = mongoose.model("Schedule", scheduleSchema)
module.exports = Schedule