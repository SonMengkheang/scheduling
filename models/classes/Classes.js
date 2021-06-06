const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
    classCode: {
        type: String,
        unique: true
    },
    className: {
        type: String
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Generation"
    },
    shift : {
        type: String
    }
},{ timestamps: true }
)

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
