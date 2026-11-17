const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.Routes");
const userRoutes = require("./routes/user.Routes");
const courseRoutes = require("./routes/course.Routes");
const enrollmentRoutes = require("./routes/enrollment.Routes");
const assignmentRoutes = require("./routes/assignment.Routes");
const submissionRoutes = require("./routes/submission.Routes");
const noteRoutes = require("./routes/note.Routes");
const attendanceRoutes = require("./routes/attendance.Routes");
const adminRoutes = require("./routes/admin.Routes");
const classRoutes = require("./routes/class.Routes");
const paymentRoutes = require("./routes/payment.Routes");
const settingsRoutes = require("./routes/settings.Routes");



const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/classes", classRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.send("Coaching centre Backend running");
});

app.use(errorMiddleware);

module.exports = app;