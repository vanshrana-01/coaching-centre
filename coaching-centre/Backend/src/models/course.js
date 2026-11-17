
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    imageFileId: {
      type: String,
      default: "",
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;
