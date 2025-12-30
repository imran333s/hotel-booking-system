import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingDashboard.css";

const AdminDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized. Please login again.");

        const { data } = await axios.get(`${API_URL}/api/booking-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted) setStats(data);
      } catch (err) {
        if (!isMounted) return;
        setError(
          err.response?.data?.message || err.message || "Failed to fetch stats"
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  if (loading) {
    return (
      <div className="dashboard-container loading-state">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container error-state">
        <p>{error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="dashboard-container error-state">
        <p>No booking stats available</p>
      </div>
    );
  }

  const boxes = [
    { title: "Total Bookings", value: stats.totalBookings || 0 },
    { title: "Booked", value: stats.booked || 0 },
    { title: "Cancelled", value: stats.cancelled || 0 },
    { title: "Successful", value: stats.successful || 0 },
    { title: "Total Superadmins", value: stats.totalAdmins || 0 },
    { title: "Total Managers", value: stats.totalManagers || 0 },
    { title: "Total Receptionists", value: stats.totalReceptionists || 0 },
    { title: "Total Users", value: stats.totalUsers || 0 },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Booking Dashboard</h2>
      <div className="dashboard-grid">
        {boxes.map((box, i) => (
          <div className="dashboard-box" key={i}>
            <h3>{box.title}</h3>
            <p>{box.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardStats;
