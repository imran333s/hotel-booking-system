import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/bookings/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.put(
        `${API_URL}/api/bookings/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Cancelled", "Booking has been cancelled", "success");
      fetchBookings(); // refresh table
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to cancel booking", "error");
    }
  };

  if (loading) return <Loader text="Loading your bookings..." />;

  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div style={container}>
      <h3 style={title}>My Booking History</h3>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Hotel</th>
            <th style={th}>Check-In</th>
            <th style={th}>Check-Out</th>
            <th style={th}>Status</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} style={tr}>
              <td style={td}>{b.hotel?.name || "—"}</td>
              <td style={td}>{new Date(b.checkIn).toLocaleDateString()}</td>
              <td style={td}>{new Date(b.checkOut).toLocaleDateString()}</td>
              <td style={td}>
                <span
                  style={{
                    ...statusBadge,
                    backgroundColor:
                      b.status === "cancelled" ? "#dc3545" : "#28a745",
                  }}
                >
                  {b.status}
                </span>
              </td>
              <td style={td}>
                <button
                  onClick={() => cancelBooking(b._id)}
                  disabled={b.status === "cancelled"}
                  style={{
                    ...cancelButton,
                    cursor:
                      b.status === "cancelled" ? "not-allowed" : "pointer",
                    backgroundColor:
                      b.status === "cancelled" ? "#aaa" : "#ff4d4f",
                  }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;

/* ----------------- STYLES ----------------- */
const container = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
};
const title = { marginBottom: "20px", fontSize: "20px", fontWeight: "600" };
const table = { width: "100%", borderCollapse: "collapse" };
const th = {
  textAlign: "left",
  padding: "14px",
  background: "#f8f9fa",
  borderBottom: "2px solid #e5e7eb",
  fontWeight: "600",
};
const td = {
  padding: "14px",
  borderBottom: "1px solid #eee",
  verticalAlign: "middle",
};
const tr = { transition: "background 0.2s" };
const statusBadge = {
  padding: "6px 14px",
  borderRadius: "20px",
  color: "#fff",
  fontSize: "12px",
  fontWeight: "500",
  textTransform: "capitalize",
  display: "inline-block",
  minWidth: "90px",
  textAlign: "center",
};
const cancelButton = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  color: "#fff",
};
