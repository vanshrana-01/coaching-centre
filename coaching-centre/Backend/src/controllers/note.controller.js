
const noteModel = require("../models/note");
const imagekit = require("../config/imagekit");

const createNote = async (req, res) => {
  try {
    const { title, description, course } = req.body;

    // Required fields validation
    if (!title || !course) {
      return res.status(400).json({
        message: "Title and course are required",
      });
    }

    // File validation
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a PDF file",
      });
    }

    // Only PDF allowed
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        message: "Only PDF files are allowed",
      });
    }

    // Upload PDF to ImageKit
    const uploadResponse = await imagekit.files.upload({
      file: req.file.buffer.toString("base64"),
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/coaching-centre/notes",
    });

    // Save note details in MongoDB
    const note = await noteModel.create({
      title,
      description,
      course,
      fileUrl: uploadResponse.url,
      fileId: uploadResponse.fileId,
      teacher: req.user.id,
    });

    return res.status(201).json({
      message: "Note uploaded successfully",
      note,
    });

  } catch (error) {
    console.error("Create Note Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};


// Get notes of a particular course
const getCourseNotes = async (req, res) => {
  try {
    const { courseId } = req.params;

    const notes = await noteModel
      .find({ course: courseId })
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });

  } catch (error) {
    console.error("Get Course Notes Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createNote,
  getCourseNotes,
};
