import React, { useEffect, useState } from "react";
import "./AssignmentTable.css";

const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ================= GET MY SUBMISSIONS =================

  const getMySubmissions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/submissions/my-submissions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= GET ASSIGNMENTS =================

  const getAssignments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/enrollments/my-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      const enrollments = data.courses || [];

      let allAssignments = [];

      for (const enrollment of enrollments) {
        const courseId =
          enrollment.course?._id || enrollment.course;

        if (!courseId) continue;

        const assignmentResponse = await fetch(
          `http://localhost:5000/api/assignments/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const assignmentData =
          await assignmentResponse.json();

        allAssignments = [
          ...allAssignments,
          ...(assignmentData.assignments || []),
        ];
      }

      setAssignments(allAssignments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssignments();
    getMySubmissions();
  }, []);

  // ================= FIND SUBMISSION =================

  const getSubmission = (assignmentId) => {
  return submissions.find(
    (submission) =>
      submission.assignment?._id === assignmentId ||
      submission.assignment === assignmentId
  );
};
  // ================= SUBMIT =================

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Please write your answer");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/submissions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            assignmentId: selectedAssignment._id,
            answer,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Submission failed");
        return;
      }

      alert("Assignment submitted successfully");

      setSelectedAssignment(null);
      setAnswer("");

      await getMySubmissions();

    } catch (error) {
      console.log(error);
      alert("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading assignments...</p>;
  }

  return (
    <div className="assignment-container">

      <h2>My Assignments</h2>

      {assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        <table className="assignment-table">

          <thead>
            <tr>
              <th>Assignment</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {assignments.map((assignment) => {

              const submission =
                getSubmission(assignment._id);

              return (
                <tr key={assignment._id}>

                  <td>{assignment.title}</td>

                  <td>
                    {assignment.course?.title ||
                      "Course"}
                  </td>

                  <td>
                    {new Date(
                      assignment.dueDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={
                        submission
                          ? submission.status === "checked"
                            ? "checked"
                            : "submitted"
                          : "pending"
                      }
                    >
                      {submission
                        ? submission.status
                        : "Pending"}
                    </span>
                  </td>

                  <td>

                    {submission ? (
                      <button
                        disabled
                        className="submitted-btn"
                      >
                        Submitted
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setSelectedAssignment(
                            assignment
                          )
                        }
                      >
                        Submit
                      </button>
                    )}

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>
      )}

      {/* ================= SUBMIT FORM ================= */}

      {selectedAssignment && (
        <div className="submit-box">

          <h2>
            {selectedAssignment.title}
          </h2>

          <p>
            {selectedAssignment.description}
          </p>

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Write your answer..."
          />

          <div className="submit-buttons">

            <button
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Answer"}
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setSelectedAssignment(null);
                setAnswer("");
              }}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default AssignmentTable;