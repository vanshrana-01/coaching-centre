
const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  if (role && !["student", "teacher", "admin"].includes(role)) {
    return res.status(400).json({
      message: "Invalid role",
    });
  }

  next();
};


const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  next();
};


const validateCourse = (req, res, next) => {
  const { title, description, price, duration } = req.body;

  if (!title || !description || price === undefined || !duration) {
    return res.status(400).json({
      message: "Title, description, price and duration are required",
    });
  }

  if (price < 0) {
    return res.status(400).json({
      message: "Price cannot be negative",
    });
  }

  next();
};


const validateEnrollment = (req, res, next) => {
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({
      message: "Course ID is required",
    });
  }

  next();
};


const validateAssignment = (req, res, next) => {
  const { title, description, course, dueDate } = req.body;

  if (!title || !description || !course || !dueDate) {
    return res.status(400).json({
      message: "Title, description, course and dueDate are required",
    });
  }

  next();
};


const validateSubmission = (req, res, next) => {
  const { assignmentId, answer } = req.body;

  if (!assignmentId || !answer) {
    return res.status(400).json({
      message: "Assignment ID and answer are required",
    });
  }

  next();
};


// Notes validation
const validateNote = (req, res, next) => {
  const { title, course } = req.body;

  if (!title || !course) {
    return res.status(400).json({
      message: "Title and course are required",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Please select a PDF file",
    });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({
      message: "Only PDF files are allowed",
    });
  }

  next();
};


const validateAttendance = (req, res, next) => {
  const { student, course, date, status } = req.body;

  if (!student || !course || !date || !status) {
    return res.status(400).json({
      message: "Student, course, date and status are required",
    });
  }

  if (!["present", "absent"].includes(status)) {
    return res.status(400).json({
      message: "Status must be present or absent",
    });
  }

  next();
};


module.exports = {
  validateRegister,
  validateLogin,
  validateCourse,
  validateEnrollment,
  validateAssignment,
  validateSubmission,
  validateNote,
  validateAttendance,
};
