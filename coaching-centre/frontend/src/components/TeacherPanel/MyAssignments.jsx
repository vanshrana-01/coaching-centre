import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherPanel.css";

const MyAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingAssignment, setEditingAssignment] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  // GET MY ASSIGNMENTS
  const getMyAssignments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/assignments/teacher/my-assignments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to load assignments");
        return;
      }

      setAssignments(data.assignments || []);
    } catch (error) {
      console.log("Assignment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyAssignments();
  }, []);

  // DELETE ASSIGNMENT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/assignments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete assignment");
        return;
      }

      alert("Assignment deleted successfully");

      setAssignments((previous) =>
        previous.filter((assignment) => assignment._id !== id)
      );
    } catch (error) {
      console.log("Delete Error:", error);
      alert("Server error");
    }
  };

  // OPEN EDIT FORM
  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);

    setTitle(assignment.title || "");
    setDescription(assignment.description || "");

    if (assignment.dueDate) {
      setDueDate(assignment.dueDate.split("T")[0]);
    } else {
      setDueDate("");
    }
  };

  // UPDATE ASSIGNMENT
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/assignments/${editingAssignment._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            description,
            dueDate,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update assignment");
        return;
      }

      alert("Assignment updated successfully");

      setAssignments((previous) =>
        previous.map((assignment) =>
          assignment._id === editingAssignment._id
            ? data.assignment
            : assignment
        )
      );

      setEditingAssignment(null);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.log("Update Error:", error);
      alert("Server error");
    } finally {
      setSaving(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="my-assignments">
        <h2>Loading assignments...</h2>
      </div>
    );
  }

  return (
    <div className="my-assignments">

      {/* HEADER */}
      <div className="assignments-heading">
        <h1>My Assignments</h1>

        <p>
          Manage your assignments and view student submissions.
        </p>
      </div>

      {/* NO ASSIGNMENTS */}
      {assignments.length === 0 ? (
        <div className="no-assignments">

          <h2>No Assignments Found</h2>

          <p>
            You haven't created any assignments yet.
          </p>

          <button
            onClick={() =>
              navigate("/teacher/create-assignment")
            }
          >
            Create Assignment
          </button>

        </div>
      ) : (

        /* ASSIGNMENT CARDS */
        <div className="assignments-grid">

          {assignments.map((assignment) => (
            <div
              className="assignment-card"
              key={assignment._id}
            >

              <div className="assignment-card-header">

                <h2>{assignment.title}</h2>

                <span>Active</span>

              </div>

              <p className="assignment-description">
                {assignment.description}
              </p>

              <div className="assignment-details">

                <p>
                  Course:{" "}
                  {assignment.course?.title || "Course"}
                </p>

                <p>
                  Due Date:{" "}
                  {new Date(
                    assignment.dueDate
                  ).toLocaleDateString()}
                </p>

              </div>

              {/* ACTION BUTTONS */}
              <div className="assignment-actions">

                <button
                  className="view-submissions-btn"
                  onClick={() =>
                    navigate(
                      `/teacher/assignment/${assignment._id}/submissions`
                    )
                  }
                >
                  View Submissions
                </button>

                <button
                  className="edit-assignment-btn"
                  onClick={() =>
                    handleEdit(assignment)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-assignment-btn"
                  onClick={() =>
                    handleDelete(assignment._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* EDIT MODAL */}
      {editingAssignment && (
        <div className="edit-assignment-overlay">

          <div className="edit-assignment-modal">

            <h2>Edit Assignment</h2>

            <form onSubmit={handleUpdate}>

              <div className="assignment-input-group">

                <label>Assignment Title</label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                />

              </div>

              <div className="assignment-input-group">

                <label>Description</label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  required
                />

              </div>

              <div className="assignment-input-group">

                <label>Due Date</label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) =>
                    setDueDate(e.target.value)
                  }
                  required
                />

              </div>

              <div className="edit-assignment-buttons">

                <button
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="cancel-edit-btn"
                  onClick={() => {
                    setEditingAssignment(null);
                    setTitle("");
                    setDescription("");
                    setDueDate("");
                  }}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default MyAssignments;