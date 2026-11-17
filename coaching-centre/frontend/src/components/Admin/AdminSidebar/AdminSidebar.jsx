import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">

      <div className="admin-logo">
        <h2>Admin Panel</h2>
      </div>

      <nav className="admin-nav">

        <NavLink to="/admin/dashboard">
          🏠 <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/students">
          👨‍🎓 <span>Students</span>
        </NavLink>

        <NavLink to="/admin/teachers">
          👨‍🏫 <span>Teachers</span>
        </NavLink>

        <NavLink to="/admin/courses">
          📚 <span>Courses</span>
        </NavLink>

        <NavLink to="/admin/assignments">
          📝 <span>Assignments</span>
        </NavLink>

        <NavLink to="/admin/payments">
          💰 <span>Payments</span>
        </NavLink>

        <NavLink to="/admin/reports">
          📊 <span>Reports</span>
        </NavLink>

        <div className="admin-nav-bottom">

          <NavLink to="/admin/settings">
            ⚙️ <span>Settings</span>
          </NavLink>

          <button className="admin-logout">
            🚪 <span>Logout</span>
          </button>

        </div>

      </nav>

    </aside>
  );
};

export default AdminSidebar;