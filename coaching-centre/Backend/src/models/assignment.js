const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },


},
{
    timestamps: true
})

const assignmentModel = mongoose.model("Assignment", assignmentSchema)

module.exports = assignmentModel