const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["submitted", "checked"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

const submissionModel = mongoose.model("Submission", submissionSchema);

module.exports = submissionModel;