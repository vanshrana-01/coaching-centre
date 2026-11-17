
const courseModel = require("../models/course");
const enrollmentModel = require("../models/enrollment");
const userModel = require("../models/user");
const imagekit = require("../config/imagekit");

// Create Course with Image Upload
const createCourse = async (req, res) => {
  try {
    const { title, description, price, duration } = req.body;

    if (!title || !description || !price || !duration) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let imageUrl = "";
    let imageFileId = "";

    // Upload image to ImageKit
    if (req.file) {
      const uploadedImage = await imagekit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `${Date.now()}-${req.file.originalname}`,
        folder: "/coaching-centre/courses",
      });

      imageUrl = uploadedImage.url;
      imageFileId = uploadedImage.fileId;
    }

    const course = await courseModel.create({
      title,
      description,
      price,
      duration,
      teacher: req.user.id,
      image: imageUrl,
      imageFileId,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
  console.error("COURSE CREATION ERROR:", error);

  return res.status(500).json({
    message: "Course creation failed",
    error: error.message,
  });
}
};

// Get All Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();

    res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Course
const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Only admin or course owner teacher can update
    if (
      req.user.role !== "admin" &&
      course.teacher.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You cannot update this course",
      });
    }

    const { title, description, price, duration } = req.body;

    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (price !== undefined) course.price = price;
    if (duration !== undefined) course.duration = duration;

    // Replace old image if a new image is uploaded
    if (req.file) {
      const uploadedImage = await imagekit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `${Date.now()}-${req.file.originalname}`,
        folder: "/coaching-centre/courses",
      });

      // Delete old ImageKit image
      if (course.imageFileId) {
        try {
          await imagekit.files.delete(course.imageFileId);
        } catch (deleteError) {
          console.log("Old image deletion failed:", deleteError.message);
        }
      }

      course.image = uploadedImage.url;
      course.imageFileId = uploadedImage.fileId;
    }

    await course.save();

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      course.teacher.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You cannot delete this course",
      });
    }

    if (course.imageFileId) {
      try {
        await imagekit.files.delete(course.imageFileId);
      } catch (deleteError) {
        console.log("Image deletion failed:", deleteError.message);
      }
    }

    await courseModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Teacher Courses
const getTeacherCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({
      teacher: req.user.id,
    });

    const coursesWithStudents = await Promise.all(
      courses.map(async (course) => {
        const studentCount = await enrollmentModel.countDocuments({
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

// Get Teacher Student Count
const getTeacherStudentCount = async (req, res) => {
  try {
    const courses = await courseModel
      .find({ teacher: req.user.id })
      .select("_id");

    const courseIds = courses.map((course) => course._id);

    const studentCount = await enrollmentModel.countDocuments({
      course: { $in: courseIds },
    });

    res.status(200).json({
      studentCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Teacher Students
const getTeacherStudents = async (req, res) => {
  try {
    const courses = await courseModel
      .find({ teacher: req.user.id })
      .select("_id title");

    const courseIds = courses.map((course) => course._id);

    const enrollments = await enrollmentModel
      .find({ course: { $in: courseIds } })
      .populate("student", "name email")
      .populate("course", "title");

    res.status(200).json({
      students: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Teachers for Home Page
const getHomeTeachers = async (req, res) => {
  try {
    const teachers = await userModel
      .find({ role: "teacher" })
      .select("name email");

    res.status(200).json({
      teachers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getTeacherCourses,
  getTeacherStudentCount,
  getTeacherStudents,
  getHomeTeachers,
};
