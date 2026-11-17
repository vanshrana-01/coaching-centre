const classModel = require("../models/class");


// ================= CREATE CLASS =================

const createClass = async (req, res) => {
  try {
    const {
      title,
      course,
      date,
      duration,
      meetingLink,
    } = req.body;

    const courseModel = require("../models/course");
    const teacherCourse = await courseModel.findOne({
      _id: course,
      teacher: req.user.id,
    });

    if (!teacherCourse) {
      return res.status(403).json({
        message: "You can only create classes for your own courses",
      });
    }

    const newClass = await classModel.create({
      title,
      course,
      date,
      duration,
      meetingLink,
      teacher: req.user.id,
    });

    res.status(201).json({
      message: "Class created successfully",
      class: newClass,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= GET MY CLASSES =================

const getMyClasses = async (req, res) => {
  try {
    const classes = await classModel
      .find({
        teacher: req.user.id,
      })
      .populate("course", "title")
      .sort({ date: 1 });

    res.status(200).json({
      classes,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= GET UPCOMING CLASSES =================

const getUpcomingClasses = async (req, res) => {
  try {
    const enrollmentModel = require("../models/enrollment");
    const enrolledCourses = await enrollmentModel
      .find({ student: req.user.id })
      .select("course");

    const courseIds = enrolledCourses.map((item) => item.course);

    const classes = await classModel
      .find({
        date: { $gte: new Date() },
        course: { $in: courseIds },
      })
      .populate("course", "title")
      .populate("teacher", "name")
      .sort({ date: 1 });

    res.status(200).json({
      classes,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= UPDATE CLASS =================

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await classModel.findOne({
      _id: id,
      teacher: req.user.id,
    });

    if (!classData) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    classData.title =
      req.body.title || classData.title;

    classData.course =
      req.body.course || classData.course;

    classData.date =
      req.body.date || classData.date;

    classData.duration =
      req.body.duration || classData.duration;

    classData.meetingLink =
      req.body.meetingLink ??
      classData.meetingLink;

    await classData.save();

    res.status(200).json({
      message: "Class updated successfully",
      class: classData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= DELETE CLASS =================

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classData =
      await classModel.findOneAndDelete({
        _id: id,
        teacher: req.user.id,
      });

    if (!classData) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.status(200).json({
      message: "Class deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createClass,
  getMyClasses,
  getUpcomingClasses,
  updateClass,
  deleteClass,
};