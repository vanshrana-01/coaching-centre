import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./UpcomingClasses.css";

const UpcomingClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUpcomingClasses = async () => {
    try {
      const response = await api.get("/classes/upcoming");

      setClasses(response.data.classes || []);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load upcoming classes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUpcomingClasses();
  }, []);

  if (loading) {
    return (
      <div className="activity-card">
        <h2>Upcoming Classes</h2>
        <p>Loading classes...</p>
      </div>
    );
  }

  return (
    <div className="activity-card">

      <div className="upcoming-header">
        <h2>Upcoming Classes</h2>
      </div>

      {classes.length === 0 ? (
        <p className="no-classes">
          No upcoming classes.
        </p>
      ) : (
        <div className="upcoming-list">

          {classes.map((item) => {

            const date = new Date(item.date);

            return (
              <div
                className="upcoming-class"
                key={item._id}
              >

                <div className="class-date">
                  <span>
                    {date.toLocaleDateString([], {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>

                <div className="class-info">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    📚 {item.course?.title || "Course"}
                  </p>

                  <p>
                    ⏰{" "}
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                </div>

                {item.meetingLink && (
                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="join-class-btn"
                  >
                    Join
                  </a>
                )}

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default UpcomingClasses;