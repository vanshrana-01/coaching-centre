const submissionModel = require("../models/submission");
const assignmentModel = require("../models/assignment");

// ==================== STUDENT SUBMIT ASSIGNMENT ====================

const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, answer } = req.body;

    // Check assignment exists
    const assignment = await assignmentModel.findById(
      assignmentId
    );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Check already submitted
    const alreadySubmitted =
      await submissionModel.findOne({
        assignment: assignmentId,
        student: req.user.id,
      });

    if (alreadySubmitted) {
      return res.status(400).json({
        message: "Assignment already submitted",
      });
    }

    // Create submission
    const submission =
      await submissionModel.create({
        assignment: assignmentId,
        student: req.user.id,
        answer,
        status: "submitted",
      });

    res.status(201).json({
      message: "Assignment submitted successfully",
      submission,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== TEACHER GET SUBMISSIONS ====================

const getAssignmentSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    // Check assignment
    const assignment =
      await assignmentModel.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Check assignment belongs to teacher
    if (
      assignment.teacher.toString() !==
      req.user.id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only view submissions of your own assignments",
      });
    }

    const submissions =
      await submissionModel
        .find({
          assignment: assignmentId,
        })
        .populate("student", "name email")
        .populate("assignment", "title dueDate")
        .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Submissions fetched successfully",
      submissions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== STUDENT GET MY SUBMISSIONS ====================

const getMySubmissions = async (req, res) => {
  try {
    const submissions =
      await submissionModel
        .find({
          student: req.user.id,
        })
        .populate("assignment", "title dueDate")
        .sort({ createdAt: -1 });

    res.status(200).json({
      message: "My submissions fetched successfully",
      submissions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== TEACHER CHECK SUBMISSION ====================

const checkSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    // Find submission
    const submission =
      await submissionModel.findById(id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    // Find assignment
    const assignment =
      await assignmentModel.findById(
        submission.assignment
      );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Check assignment belongs to teacher
    if (
      assignment.teacher.toString() !==
      req.user.id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only check submissions of your own assignments",
      });
    }

    // Mark checked
    submission.status = "checked";

    await submission.save();

    res.status(200).json({
      message: "Submission checked successfully",
      submission,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== TEACHER PENDING REVIEW COUNT ====================

const getTeacherPendingCount = async (req, res) => {
  try {
    const assignments = await assignmentModel
      .find({ teacher: req.user.id })
      .select("_id");

    const assignmentIds = assignments.map((assignment) => assignment._id);

    const pendingCount = await submissionModel.countDocuments({
      assignment: { $in: assignmentIds },
      status: "submitted",
    });

    res.status(200).json({ pendingCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==================== EXPORT ====================

module.exports = {
  submitAssignment,
  getAssignmentSubmissions,
  getMySubmissions,
  checkSubmission,
  getTeacherPendingCount,
};