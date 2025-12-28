import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.put(
        `${API_URL}/api/bookings/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings(); // Refresh bookings after cancellation
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  if (loading) return <Loader text="Loading Bookings..." />;

  return (
    <div style={container}>
      <h2 style={title}>Booking Management</h2>

      <div style={card}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>User</th>
              <th style={th}>Email</th>
              <th style={th}>Hotel</th>
              <th style={th}>Check In</th>
              <th style={th}>Check Out</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" style={emptyRow}>
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b, index) => (
                <tr
                  key={b._id}
                  style={{ background: index % 2 === 0 ? "#f9fafb" : "#ffffff" }}
                >
                  <td style={td}>{b.user?.name || "—"}</td>
                  <td style={td}>{b.user?.email || "—"}</td>
                  <td style={td}>{b.hotel?.name || "—"}</td>
                  <td style={td}>{new Date(b.checkIn).toLocaleDateString()}</td>
                  <td style={td}>{new Date(b.checkOut).toLocaleDateString()}</td>
                  <td style={td}>
                    <span style={statusBadge(b.status)}>{b.status}</span>
                  </td>
                  <td style={td}>
                    {b.status === "booked" && (
                      <button
                        style={cancelBtn}
                        onClick={() => cancelBooking(b._id)}
                      >
                        Cancel
                      </button>
                    )}
                    {(b.status === "cancelled" || b.status === "successful") && (
                      <span style={noAction}>—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ===================== STYLES ===================== */

const container = { padding: "20px" };

const title = { marginBottom: "20px", fontSize: "22px", fontWeight: "600" };

const card = {
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  overflowX: "auto",
};

const table = { width: "100%", borderCollapse: "collapse" };

const th = {
  padding: "14px",
  textAlign: "left",
  background: "#1f2937",
  color: "#ffffff",
  fontWeight: "500",
  fontSize: "14px",
  position: "sticky",
  top: 0,
};

const td = { padding: "12px 14px", fontSize: "14px", color: "#374151" };

const emptyRow = { padding: "20px", textAlign: "center", color: "#6b7280" };

const statusBadge = (status) => ({
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "500",
  color: "#fff",
  textTransform: "capitalize",
  background:
    status === "booked" ? "#2563eb" : status === "cancelled" ? "#dc2626" : "#16a34a",
});

const cancelBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  background: "#dc2626",
  color: "#fff",
  cursor: "pointer",
  fontSize: "13px",
};

const noAction = {
  color: "#6b7280",
  fontStyle: "italic",
  fontSize: "13px",
};

export default BookingManagement;
