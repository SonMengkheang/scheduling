const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentCode: {
        type: String,
        unique: true
    },
    departmentName: {
        type: String
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
