import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import "./StudentCourseDetails.css";

const StudentCourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [courseResponse, assignmentResponse] = await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get(`/assignments/course/${courseId}`),
        ]);
        setCourse(courseResponse.data.course);
        setAssignments(assignmentResponse.data.assignments || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  if (loading) return <div className="student-course-details"><h2>Loading course...</h2></div>;
  if (!course) return <div className="student-course-details"><h2>Course not found</h2></div>;

  return (
    <div className="student-course-details">
      <div className="student-course-hero">
        <div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <p>Instructor: {course.teacher?.name || "Teacher"}</p>
          <div className="student-course-meta">
            <span>Duration: {course.duration}</span>
            <span>Fee: ₹{course.price}</span>
            <span>Assignments: {assignments.length}</span>
          </div>
        </div>
      </div>

      <section className="student-course-assignments">
        <h2>Assignments</h2>
        {assignments.length === 0 ? (
          <div className="student-empty-box">
            <h3>No Assignments Yet</h3>
            <p>Your teacher has not added an assignment for this course.</p>
          </div>
        ) : (
          <div className="student-assignment-list">
            {assignments.map((assignment) => (
              <div className="student-assignment-card" key={assignment._id}>
                <div>
                  <h3>{assignment.title}</h3>
                  <p>{assignment.description}</p>
                  <small>
                    Due: {new Date(assignment.dueDate).toLocaleDateString("en-IN")}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentCourseDetails;
