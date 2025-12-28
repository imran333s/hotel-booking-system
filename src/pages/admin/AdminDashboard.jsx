// src/pages/admin/AdminDashboard.jsx
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

const AdminDashboard = () => {
  const { user } = useContext(AuthContext); // get logged-in user from context
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState(
    localStorage.getItem("adminPage") || "dashboard"
  );
  const [loading, setLoading] = useState(true);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminPage");
    localStorage.removeItem("user"); // optional: remove stored user
    navigate("/login");
  };

  // Check user role and set loading
  useEffect(() => {
    if (user === null) {
      // user context not loaded yet, wait
      return;
    }

    if (!user) {
      navigate("/login"); // not logged in
      return;
    }

    if (!["admin", "superadmin"].includes(user.role.toLowerCase())) {
      navigate("/"); // non-admins
      return;
    }

    setLoading(false); // user is valid admin
  }, [user, navigate]);

  // Persist active page
  useEffect(() => {
    localStorage.setItem("adminPage", activePage);
  }, [activePage]);

  // Loader while checking
  if (loading) return <Loader text="Loading Admin Panel..." />;

  // Function to switch modules
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDashboardStats />;
      case "hotels":
        return <HotelManagement />;
      case "bookings":
        return <BookingManagement />;
      case "blogs":
        return <BlogManagement />;
      case "users":
        return <UserManagement />;
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
        <AdminHeader
          adminName={user.name}
          role={user.role}
          onLogout={handleLogout}
        />
        <main style={{ padding: "20px" }}>{renderContent()}</main>
      </div>
    </div>
  );
};

const sidebarItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "hotels", label: "Hotel Management" },
  { key: "bookings", label: "Booking Management" },
  { key: "blogs", label: "Blog Management" },
  { key: "users", label: "User / Employee Management" },
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
