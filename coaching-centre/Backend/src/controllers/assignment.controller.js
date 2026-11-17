const assignmentModel = require("../models/assignment");

// ==================== CREATE ASSIGNMENT - TEACHER ====================

const createAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      course,
      dueDate,
    } = req.body;

    const courseModel = require("../models/course");
    const teacherCourse = await courseModel.findOne({
      _id: course,
      teacher: req.user.id,
    });

    if (!teacherCourse) {
      return res.status(403).json({
        message: "You can only create assignments for your own courses",
      });
    }

    const assignment = await assignmentModel.create({
      title,
      description,
      course,
      dueDate,
      teacher: req.user.id,
    });

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== GET ASSIGNMENTS OF COURSE ====================

const getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (req.user.role === "student") {
      const enrollmentModel = require("../models/enrollment");
      const enrolled = await enrollmentModel.findOne({
        student: req.user.id,
        course: courseId,
      });

      if (!enrolled) {
        return res.status(403).json({
          message: "Enroll in this course to view its assignments",
        });
      }
    }

    const assignments = await assignmentModel
      .find({
        course: courseId,
      })
      .populate("teacher", "name email")
      .populate("course", "title")
      .sort({ dueDate: 1 });

    res.status(200).json({
      message: "Assignments fetched successfully",
      assignments,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== GET SINGLE ASSIGNMENT ====================

const getAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await assignmentModel
      .findById(id)
      .populate("teacher", "name email")
      .populate("course", "title");

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      message: "Assignment fetched successfully",
      assignment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== GET TEACHER ASSIGNMENTS ====================

const getTeacherAssignments = async (req, res) => {
  try {
    const assignments = await assignmentModel
      .find({
        teacher: req.user.id,
      })
      .populate("course", "title")
      .sort({ dueDate: 1 });

    res.status(200).json({
      message: "Teacher assignments fetched successfully",
      assignments,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== UPDATE ASSIGNMENT - TEACHER ====================

const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment =
      await assignmentModel.findById(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Check assignment belongs to logged-in teacher
    if (
      assignment.teacher.toString() !==
      req.user.id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only update your own assignments",
      });
    }

    assignment.title =
      req.body.title || assignment.title;

    assignment.description =
      req.body.description ||
      assignment.description;

    assignment.course =
      req.body.course ||
      assignment.course;

    assignment.dueDate =
      req.body.dueDate ||
      assignment.dueDate;

    await assignment.save();

    const updatedAssignment =
      await assignmentModel
        .findById(assignment._id)
        .populate("course", "title");

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment: updatedAssignment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== DELETE ASSIGNMENT - TEACHER ====================

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment =
      await assignmentModel.findById(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Check assignment belongs to logged-in teacher
    if (
      assignment.teacher.toString() !==
      req.user.id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only delete your own assignments",
      });
    }

    await assignmentModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Assignment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ==================== GET ALL ASSIGNMENTS - ADMIN ====================

const getAllAssignments = async (req, res) => {
  try {
    const assignments = await assignmentModel
      .find()
      .populate("teacher", "name email")
      .populate("course", "title")
      .sort({ dueDate: 1 });

    res.status(200).json({
      message: "All assignments fetched successfully",
      assignments,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== TEACHER ASSIGNMENT COUNT ====================

const getTeacherAssignmentCount = async (req, res) => {
  try {
    const assignmentCount = await assignmentModel.countDocuments({
      teacher: req.user.id,
    });

    res.status(200).json({ assignmentCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==================== EXPORT ====================

module.exports = {
  createAssignment,
  getCourseAssignments,
  getAssignment,
  getTeacherAssignments,
  updateAssignment,
  deleteAssignment,
  getAllAssignments,
  getTeacherAssignmentCount,
};