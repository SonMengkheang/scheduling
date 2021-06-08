const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    facultyCode: {
        type: String,
        unique: true
    },
    facultyName: {
        type: String
    },
    department :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }],
},{ timestamps: true });

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
