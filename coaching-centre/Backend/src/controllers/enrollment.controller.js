const enrollmentModel = require("../models/enrollment");
const courseModel = require("../models/course");
const userModel = require("../models/user");

// ==================== STUDENT ENROLL ====================

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    const alreadyEnrolled = await enrollmentModel.findOne({
      student: studentId,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "Already enrolled",
      });
    }

    const enrollment = await enrollmentModel.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json({
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// ==================== STUDENT MY COURSES ====================

const getMyCourses = async (req, res) => {
  try {

    const courses = await enrollmentModel
      .find({
        student: req.user.id,
      })
      .populate({
        path: "course",
        populate: {
          path: "teacher",
          select: "name email",
        },
      });

    res.status(200).json({
      courses,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ==================== TEACHER GET COURSE STUDENTS ====================

const getCourseStudents = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollments = await enrollmentModel
      .find({
        course: courseId,
      })
      .populate("student", "name email");

    const students = enrollments
      .map((enrollment) => enrollment.student)
      .filter(Boolean);

    res.status(200).json({
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  enrollCourse,
  getMyCourses,
  getCourseStudents,
};