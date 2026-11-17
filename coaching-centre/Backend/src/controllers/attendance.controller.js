const attendanceModel = require("../models/attendance");

// ==================== MARK / UPDATE ATTENDANCE ====================

const markAttendance = async (req, res) => {
  try {
    const { student, course, date, status } = req.body;

    const existingAttendance = await attendanceModel.findOne({
      student,
      course,
      date,
    });

    // Already exists → update
    if (existingAttendance) {
      existingAttendance.status = status;

      await existingAttendance.save();

      return res.status(200).json({
        message: "Attendance updated successfully",
        attendance: existingAttendance,
      });
    }

    // Doesn't exist → create
    const attendance = await attendanceModel.create({
      student,
      course,
      date,
      status,
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==================== STUDENT MY ATTENDANCE ====================

const getMyAttendance = async (req, res) => {
  try {
    const attendance = await attendanceModel
      .find({
        student: req.user.id,
      })
      .populate("course", "title")
      .sort({ date: -1 });

    res.status(200).json({
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==================== TEACHER COURSE ATTENDANCE ====================

const getCourseAttendance = async (req, res) => {
  try {
    const { courseId } = req.params;

    const attendance = await attendanceModel
      .find({
        course: courseId,
      })
      .populate("student", "name email")
      .populate("course", "title")
      .sort({ date: -1 });

    res.status(200).json({
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==================== STUDENT ATTENDANCE SUMMARY ====================

const getAttendanceSummary = async (req, res) => {
  try {
    const studentId = req.user.id;

    const records = await attendanceModel.find({
      student: studentId,
    });

    const totalClasses = records.length;

    const present = records.filter(
      (record) => record.status === "present"
    ).length;

    const absent = records.filter(
      (record) => record.status === "absent"
    ).length;

    const percentage =
      totalClasses === 0
        ? 0
        : ((present / totalClasses) * 100).toFixed(2);

    res.status(200).json({
      totalClasses,
      present,
      absent,
      attendancePercentage: Number(percentage),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==================== EXPORT ====================

module.exports = {
  markAttendance,
  getMyAttendance,
  getCourseAttendance,
  getAttendanceSummary,
};