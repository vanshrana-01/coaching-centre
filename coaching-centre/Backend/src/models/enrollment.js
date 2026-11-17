const mongoose = require("mongoose")

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required : true,
    },
    status: {
        type :String,
        enum: ["enrolled","completed"],
        default: "enrolled",
    },
},{
    timestamps: true,
})

const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema)

module.exports = enrollmentModel