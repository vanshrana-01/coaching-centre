import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./StudentAssignments.css";

const StudentAssignments = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);

  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(null);


  // ==================== GET MY COURSES ====================

  const getMyCourses = async () => {
    try {
      const response = await api.get(
        "/enrollments/my-courses"
      );

      console.log("My Courses:", response.data);

      setCourses(response.data.courses || []);

      return response.data.courses || [];

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch courses"
      );

      return [];
    }
  };


  // ==================== GET ASSIGNMENTS ====================

  const getAssignments = async (enrolledCourses) => {
    try {
      let allAssignments = [];

      for (const enrollment of enrolledCourses) {

        const courseId =
          enrollment.course?._id ||
          enrollment.course;

        if (!courseId) {
          continue;
        }

        try {

          const response = await api.get(
            `/assignments/course/${courseId}`
          );

          const courseAssignments =
            response.data.assignments || [];

          allAssignments = [
            ...allAssignments,
            ...courseAssignments,
          ];

        } catch (error) {

          console.log(
            `Failed to fetch assignments for course ${courseId}`,
            error
          );

        }
      }

      setAssignments(allAssignments);

    } catch (error) {

      console.log(error);

    }
  };


  // ==================== GET MY SUBMISSIONS ====================

  const getMySubmissions = async () => {

    try {

      const response = await api.get(
        "/submissions/my-submissions"
      );

      console.log(
        "My Submissions:",
        response.data
      );

      setMySubmissions(
        response.data.submissions || []
      );

    } catch (error) {

      console.log(error);

    }
  };


  // ==================== LOAD DATA ====================

  useEffect(() => {

    const loadData = async () => {

      try {

        const enrolledCourses =
          await getMyCourses();

        await getAssignments(
          enrolledCourses
        );

        await getMySubmissions();

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);


  // ==================== ANSWER CHANGE ====================

  const handleAnswerChange = (
    assignmentId,
    value
  ) => {

    setAnswers((prev) => ({
      ...prev,
      [assignmentId]: value,
    }));

  };


  // ==================== GET SUBMISSION ====================

  const getSubmission = (assignmentId) => {

    return mySubmissions.find(
      (submission) =>
        submission.assignment?._id ===
        assignmentId
    );

  };


  // ==================== SUBMIT ASSIGNMENT ====================

  const handleSubmit = async (assignmentId) => {

    const answer =
      answers[assignmentId];

    if (!answer || !answer.trim()) {

      alert(
        "Please write your answer first"
      );

      return;
    }

    try {

      setSubmitting(assignmentId);

      const response = await api.post(
        "/submissions",
        {
          assignmentId,
          answer: answer.trim(),
        }
      );

      console.log(response.data);

      alert(
        "Assignment submitted successfully"
      );


      // Add newly created submission
      // directly to state

      if (response.data.submission) {

        setMySubmissions((prev) => [
          response.data.submission,
          ...prev,
        ]);

      } else {

        await getMySubmissions();

      }


      // Clear answer

      setAnswers((prev) => ({
        ...prev,
        [assignmentId]: "",
      }));

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Assignment submission failed"
      );

    } finally {

      setSubmitting(null);

    }
  };


  // ==================== LOADING ====================

  if (loading) {

    return (
      <div className="student-assignments-page">

        <div className="loading-box">

          <h2>
            Loading assignments...
          </h2>

        </div>

      </div>
    );

  }


  return (

    <div className="student-assignments-page">


      {/* ==================== HEADER ==================== */}

      <div className="student-assignments-header">

        <h1>
          My Assignments
        </h1>

        <p>
          Complete and submit your course
          assignments.
        </p>

      </div>


      {/* ==================== NO ASSIGNMENTS ==================== */}

      {assignments.length === 0 ? (

        <div className="no-student-assignments">

          <h2>
            No Assignments Available
          </h2>

          <p>
            Your enrolled courses don't have
            any assignments yet.
          </p>

        </div>

      ) : (


        /* ==================== ASSIGNMENTS ==================== */

        <div className="student-assignments-list">

          {assignments.map((assignment) => {

            const submission =
              getSubmission(
                assignment._id
              );

            return (

              <div
                className="student-assignment-card"
                key={assignment._id}
              >


                {/* ==================== TITLE ==================== */}

                <h2>
                  {assignment.title}
                </h2>


                {/* ==================== DESCRIPTION ==================== */}

                <p className="assignment-description">
                  {assignment.description}
                </p>


                {/* ==================== COURSE / DATE ==================== */}

                <div className="assignment-info">

                  <span>
                    Course:{" "}

                    <strong>
                      {assignment.course?.title ||
                        "Course"}
                    </strong>
                  </span>


                  <span>
                    Due Date:{" "}

                    <strong>

                      {assignment.dueDate
                        ? new Date(
                            assignment.dueDate
                          ).toLocaleDateString()
                        : "Not specified"}

                    </strong>
                  </span>

                </div>


                {/* ==================== SUBMITTED ==================== */}

                {submission ? (

                  <div className="submission-status-box">

                    <div>

                      <span className="submitted-label">
                        ✓ Submitted
                      </span>

                      <p>
                        Submitted on:{" "}

                        {submission.createdAt
                          ? new Date(
                              submission.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>

                    </div>


                    {/* CHECK STATUS */}

                    {submission.status ===
                    "checked" ? (

                      <span className="checked-label">
                        ✓ Teacher Checked
                      </span>

                    ) : (

                      <span className="waiting-label">
                        ⏳ Waiting for Teacher Review
                      </span>

                    )}

                  </div>

                ) : (


                  /* ==================== ANSWER ==================== */

                  <>

                    <textarea
                      placeholder="Write your answer here..."
                      value={
                        answers[
                          assignment._id
                        ] || ""
                      }
                      onChange={(e) =>
                        handleAnswerChange(
                          assignment._id,
                          e.target.value
                        )
                      }
                    />


                    {/* ==================== SUBMIT BUTTON ==================== */}

                    <button
                      onClick={() =>
                        handleSubmit(
                          assignment._id
                        )
                      }
                      disabled={
                        submitting ===
                        assignment._id
                      }
                    >

                      {submitting ===
                      assignment._id
                        ? "Submitting..."
                        : "Submit Assignment"}

                    </button>

                  </>

                )}

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
};

export default StudentAssignments;