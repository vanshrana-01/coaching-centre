import { Outlet } from "react-router-dom";
import "./AdminLayout.css";
import AdminSidebar from "../../components/Admin/AdminSidebar/AdminSidebar";
import AdminTopbar from "../../components/Admin/AdminTopbar/AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">

        <AdminTopbar />

        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;