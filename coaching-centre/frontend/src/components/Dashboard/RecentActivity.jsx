import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Dashboard.css";

const RecentActivity = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET MY SUBMISSIONS =================

  const getMySubmissions = async () => {
    try {
      const response = await api.get(
        "/submissions/my-submissions"
      );

      console.log(
        "Recent Activity:",
        response.data
      );

      setSubmissions(
        response.data.submissions || []
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMySubmissions();
  }, []);

  return (
    <div className="activity-card">

      <h2>Recent Activity</h2>

      {loading ? (

        <p>Loading activity...</p>

      ) : submissions.length === 0 ? (

        <div className="empty-activity">
          <p>
            No recent activity yet.
          </p>
        </div>

      ) : (

        <ul>

          {submissions.slice(0, 5).map(
            (submission) => (

              <li key={submission._id}>

                <div>

                  <strong>
                    📚 Assignment Submitted
                  </strong>

                  <p>
                    {submission.assignment?.title ||
                      "Assignment"}
                  </p>

                  <small>
                    {submission.status === "checked"
                      ? "✓ Teacher checked your submission"
                      : "⏳ Waiting for teacher review"}
                  </small>

                </div>

              </li>

            )
          )}

        </ul>

      )}

    </div>
  );
};

export default RecentActivity;