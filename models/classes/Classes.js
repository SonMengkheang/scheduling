const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
    classesCode: {
        type: String,
        unique: true
    },
    classesName: {
        type: String
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    generation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Generation"
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    shift : {
        type: String
    }
},{ timestamps: true }
)

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
