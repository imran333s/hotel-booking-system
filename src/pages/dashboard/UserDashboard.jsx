import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import BookingHistory from "./BookingHistory";
import Wishlist from "./Wishlist";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Update Profile" },
    { id: "bookings", label: "Booking History" },
    { id: "wishlist", label: "Wishlist" },
  ];

  return (
    <div style={container}>
      <h2 style={title}>User Dashboard</h2>

      {/* Tab Navigation */}
      <div style={tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...tabButton,
              ...(activeTab === tab.id ? activeTabStyle : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={card}>
        {activeTab === "profile" && <UpdateProfile />}
        {activeTab === "bookings" && <BookingHistory />}
        {activeTab === "wishlist" && <Wishlist />}
      </div>
    </div>
  );
};

export default UserDashboard;

/* ---------- Styles ---------- */
const container = {
  maxWidth: "1000px",
  margin: "40px auto",
  padding: "20px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#333",
};

const title = {
  marginBottom: "25px",
  fontSize: "28px",
  fontWeight: "600",
};

const tabContainer = {
  display: "flex",
  gap: "15px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const tabButton = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "#f5f5f5",
  cursor: "pointer",
  fontWeight: "500",
  transition: "all 0.3s ease",
};

const activeTabStyle = {
  background: "#007bff",
  color: "#fff",
  borderColor: "#007bff",
  boxShadow: "0 4px 10px rgba(0,123,255,0.3)",
};

const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
  minHeight: "400px",
  transition: "all 0.3s ease",
};
