const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    title: {
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

    date: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    meetingLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const classModel = mongoose.model("Class", classSchema);

module.exports = classModel;