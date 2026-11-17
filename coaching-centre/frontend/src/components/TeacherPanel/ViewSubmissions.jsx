import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TeacherPanel.css";

const ViewSubmissions = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingId, setCheckingId] = useState(null);

  // ================= GET SUBMISSIONS =================

  const getSubmissions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/submissions/assignment/${assignmentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to load submissions"
        );
        return;
      }

      setSubmissions(data.submissions || []);

    } catch (error) {
      console.log("Submission Error:", error);

      alert("Server error");

    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD SUBMISSIONS =================

  useEffect(() => {
    getSubmissions();
  }, [assignmentId]);

  // ================= CHECK SUBMISSION =================

  const handleCheck = async (submissionId) => {
    try {
      setCheckingId(submissionId);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/submissions/${submissionId}/check`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to check submission"
        );
        return;
      }

      // Update submission status in UI

      setSubmissions((previousSubmissions) =>
        previousSubmissions.map((submission) =>
          submission._id === submissionId
            ? {
                ...submission,
                status: "checked",
              }
            : submission
        )
      );

      alert("Submission checked successfully");

    } catch (error) {
      console.log(
        "Check Submission Error:",
        error
      );

      alert("Server error");

    } finally {
      setCheckingId(null);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="view-submissions">
        <h2>Loading submissions...</h2>
      </div>
    );
  }

  // ================= PAGE =================

  return (
    <div className="view-submissions">

      {/* ================= HEADER ================= */}

      <div className="submission-header">

        <div>
          <h1>Student Submissions</h1>

          <p>
            Review answers submitted by your students.
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
        >
          Back
        </button>

      </div>


      {/* ================= NO SUBMISSIONS ================= */}

      {submissions.length === 0 ? (

        <div className="no-submissions">

          <h2>No submissions yet</h2>

          <p>
            Students have not submitted this assignment.
          </p>

        </div>

      ) : (

        <div className="submission-list">

          {submissions.map((submission) => (

            <div
              className="submission-card"
              key={submission._id}
            >

              {/* ================= STUDENT INFO ================= */}

              <div className="student-info">

                <div className="student-avatar">

                  {submission.student?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "S"}

                </div>

                <div>

                  <h3>
                    {submission.student?.name ||
                      "Student"}
                  </h3>

                  <p>
                    {submission.student?.email ||
                      "No email"}
                  </p>

                </div>

              </div>


              {/* ================= ASSIGNMENT ================= */}

              <div className="assignment-name">

                <strong>
                  Assignment:
                </strong>{" "}

                {submission.assignment?.title ||
                  "Assignment"}

              </div>


              {/* ================= ANSWER ================= */}

              <div className="submission-answer">

                <h4>
                  Student Answer
                </h4>

                <p>
                  {submission.answer}
                </p>

              </div>


              {/* ================= FOOTER ================= */}

              <div className="submission-footer">

                {/* STATUS */}

                <span
                  className={
                    submission.status === "checked"
                      ? "status checked"
                      : "status submitted"
                  }
                >
                  {submission.status}
                </span>


                {/* DATE */}

                <span className="submitted-date">

                  Submitted:{" "}

                  {submission.createdAt
                    ? new Date(
                        submission.createdAt
                      ).toLocaleDateString()
                    : "Unknown"}

                </span>


                {/* CHECK BUTTON */}

                {submission.status !== "checked" && (

                  <button
                    className="check-btn"
                    onClick={() =>
                      handleCheck(
                        submission._id
                      )
                    }
                    disabled={
                      checkingId ===
                      submission._id
                    }
                  >

                    {checkingId ===
                    submission._id
                      ? "Checking..."
                      : "Check"}

                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default ViewSubmissions;