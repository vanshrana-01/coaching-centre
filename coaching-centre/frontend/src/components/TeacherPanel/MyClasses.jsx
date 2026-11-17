import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./TeacherPanel.css";

const MyClasses = () => {

  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);


  // ================= GET CLASSES =================

  const getMyClasses = async () => {

    try {

      const response = await api.get(
        "/classes/my-classes"
      );

      setClasses(
        response.data.classes || []
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load classes"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    getMyClasses();
  }, []);


  // ================= DELETE =================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this class?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(
        `/classes/${id}`
      );

      setClasses((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      alert(
        "Class deleted successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete class"
      );

    }
  };


  return (

    <div className="my-classes-page">

      {/* HEADER */}

      <div className="my-classes-header">

        <div>

          <h1>My Classes</h1>

          <p>
            Manage your scheduled classes.
          </p>

        </div>

        <button
          onClick={() =>
            navigate(
              "/teacher/create-class"
            )
          }
        >
          + Create Class
        </button>

      </div>


      {/* LOADING */}

      {loading ? (

        <div className="classes-message">

          <h2>
            Loading classes...
          </h2>

        </div>

      ) : classes.length === 0 ? (

        <div className="classes-message">

          <h2>
            No Classes Scheduled
          </h2>

          <p>
            Create your first class.
          </p>

        </div>

      ) : (

        <div className="classes-grid">

          {classes.map((item) => {

            const classDate =
              new Date(item.date);

            const isUpcoming =
              classDate >= new Date();

            return (

              <div
                className="class-card"
                key={item._id}
              >

                <div className="class-card-top">

                  <h2>
                    {item.title}
                  </h2>

                  <span
                    className={
                      isUpcoming
                        ? "class-status upcoming"
                        : "class-status completed"
                    }
                  >
                    {isUpcoming
                      ? "Upcoming"
                      : "Completed"}
                  </span>

                </div>


                <p>
                  📚 Course:{" "}
                  <strong>
                    {item.course?.title ||
                      "Course"}
                  </strong>
                </p>


                <p>
                  📅 Date:{" "}
                  {classDate.toLocaleDateString()}
                </p>


                <p>
                  ⏰ Time:{" "}
                  {classDate.toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>


                <p>
                  ⌛ Duration:{" "}
                  {item.duration} minutes
                </p>


                {item.meetingLink && (

                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="meeting-button"
                  >
                    Join Meeting
                  </a>

                )}


                <div className="class-actions">

                  <button
                    className="edit-class-button"
                    onClick={() =>
                      navigate(
                        `/teacher/edit-class/${item._id}`
                      )
                    }
                  >
                    Edit
                  </button>


                  <button
                    className="delete-class-button"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
};

export default MyClasses;