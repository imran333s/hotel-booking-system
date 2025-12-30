import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import AdminHeader from "./AdminHeader";
import AdminDashboardStats from "./AdminDashboardStats";
import HotelManagement from "./HotelManagement";
import BookingManagement from "./BookingManagement";
import BlogManagement from "./BlogManagement";
import UserManagement from "./UserManagement";
import Loader from "../../components/Loader";
import AddHotel from "./AddHotel";
import AddBlog from "./AddBlog";
import AddRole from "./AddRole";
const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState(
    localStorage.getItem("adminPage") || "dashboard"
  );
  const [loading, setLoading] = useState(true);

  // Redirect if user is null or not admin
  useEffect(() => {
    if (user === null) return; // still loading
    if (!user || !["admin", "superadmin"].includes(user.role.toLowerCase())) {
      navigate("/login"); // redirect non-admins
    } else {
      setLoading(false); // valid admin
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminPage");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // also remove token
    navigate("/login");
  };

  if (loading || !user) return <Loader text="Loading Admin Panel..." />;

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDashboardStats />;
      case "hotels":
        return <HotelManagement setActivePage={setActivePage} />;
      case "addHotel":
        return <AddHotel setActivePage={setActivePage} />;
      case "bookings":
        return <BookingManagement />;
      case "blogs":
        return <BlogManagement />;
      case "addBlog":
        return <AddBlog setActivePage={setActivePage} />;
      case "users":
        return <UserManagement />;
      case "addRole":
        return <AddRole />;
      default:
        return <AdminDashboardStats />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <h3>Admin Panel</h3>
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            style={{
              ...btnStyle,
              background: activePage === item.key ? "#79da84" : "#374151",
            }}
          >
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {user && (
          <AdminHeader
            adminName={user.name}
            role={user.role}
            onLogout={handleLogout}
          />
        )}
        <main style={{ padding: "20px" }}>{renderContent()}</main>
      </div>
    </div>
  );
};

const sidebarItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "hotels", label: "Hotel Management" },
  { key: "addHotel", label: "➕ Add Hotel" },
  { key: "bookings", label: "Booking Management" },
  { key: "blogs", label: "Blog Management" },
  { key: "addBlog", label: "➕ Add Blog" }, // ✅ NEW
  { key: "users", label: "User / Employee Management" },
  { key: "addRole", label: "Add Role" },
];

const sidebarStyle = {
  width: "230px",
  background: "#1f2937",
  padding: "20px",
  color: "#fff",
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "6px",
};

export default AdminDashboard;
