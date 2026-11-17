const userModel = require("../models/user");
const courseModel = require("../models/course");
const enrollmentModel = require("../models/enrollment");
const paymentModel = require("../models/payment");

// ==================== DASHBOARD STATS ====================

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();

    const totalStudents = await userModel.countDocuments({
      role: "student",
    });

    const totalTeachers = await userModel.countDocuments({
      role: "teacher",
    });

    const totalCourses = await courseModel.countDocuments();

    res.status(200).json({
      totalUsers,
      totalStudents,
      totalTeachers,
      totalCourses,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== GET ALL USERS ====================

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select("-password");

    res.status(200).json({
      users,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== DELETE USER ====================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      return res.status(400).json({
        message: "You cannot delete yourself",
      });
    }

    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== UPDATE USER ROLE ====================

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (id === req.user.id) {
      return res.status(400).json({
        message: "You cannot change your own role",
      });
    }

    if (!["student", "teacher", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const user = await userModel
      .findByIdAndUpdate(
        id,
        { role },
        {
          new: true,
          runValidators: true,
        }
      )
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User role updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== GET ALL COURSES ====================

const getAllCourses = async (req, res) => {
  try {

    const courses = await courseModel
      .find()
      .populate("teacher", "name email");

    const coursesWithStudents = await Promise.all(

      courses.map(async (course) => {

        const studentCount =
          await enrollmentModel.countDocuments({
            course: course._id,
          });

        return {
          ...course.toObject(),
          studentCount,
        };

      })

    );

    res.status(200).json({
      courses: coursesWithStudents,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ==================== REPORTS ====================

const getReports = async (req, res) => {
  try {
    // Total students
    const totalStudents = await userModel.countDocuments({
      role: "student",
    });

    // Total courses
    const totalCourses = await courseModel.countDocuments();

    // Total enrollments
    const totalEnrollments =
      await enrollmentModel.countDocuments();

    // Revenue
    const payments = await paymentModel.find({
      status: "paid",
    });

    const totalRevenue = payments.reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

    // Popular courses
    const courses = await courseModel.find();

    const popularCourses = await Promise.all(
      courses.map(async (course) => {
        const studentCount =
          await enrollmentModel.countDocuments({
            course: course._id,
          });

        return {
          id: course._id,
          title: course.title,
          students: studentCount,
        };
      })
    );

    popularCourses.sort(
      (a, b) => b.students - a.students
    );

    res.status(200).json({
      totalStudents,
      totalCourses,
      totalEnrollments,
      totalRevenue,
      popularCourses,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllCourses,
  getReports
};