import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

const HotelDetails = ({ hotelId, isOpen, onClose }) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!hotelId || !isOpen) return;

    const fetchHotel = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/hotels/${hotelId}`);
        setHotel(res.data);
      } catch (err) {
        console.error("Failed to fetch hotel", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId, isOpen, API_URL]);

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    if (!token) {
      alert("Please login to book");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/bookings`,
        { hotel: hotel._id, checkIn, checkOut, guests },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking successful!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  if (!isOpen) return null;
  if (loading) return <Loader text="Loading hotel details..." />;

  if (!hotel) return <p style={{ padding: "20px" }}>Hotel not found</p>;

  // Handle image (URL or Base64)
  let imageSrc =
    hotel.images?.[0] || "https://source.unsplash.com/600x400/?hotel";
  if (
    imageSrc &&
    !imageSrc.startsWith("http") &&
    !imageSrc.startsWith("data:")
  ) {
    imageSrc = `data:image/jpeg;base64,${imageSrc}`;
  }

  return (
    <div style={drawerOverlay}>
      <div style={drawerStyle}>
        <button onClick={onClose} style={closeBtn}>
          ×
        </button>

        {/* Hotel Image */}
        <div style={{ marginBottom: "20px" }}>
          <img
            src={imageSrc}
            alt={hotel.name}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Hotel Info */}
        <h2>{hotel.name}</h2>
        <p style={{ color: "#555" }}>📍 {hotel.location}</p>
        <p style={{ fontWeight: "600" }}>₹{hotel.pricePerNight} / night</p>
        {hotel.rating && <p>⭐ {hotel.rating.toFixed(1)} / 5</p>}
        {hotel.amenities && <p>💡 {hotel.amenities.join(" • ")}</p>}
        {hotel.description && (
          <p style={{ marginTop: "10px" }}>{hotel.description}</p>
        )}

        {/* Booking Form */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              style={inputStyle}
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={inputStyle}
            />
          </div>

          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            style={inputStyle}
            placeholder="Number of Guests"
          />

          <button onClick={handleBooking} style={bookBtn}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const drawerOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const drawerStyle = {
  background: "#fff",
  width: "400px",
  maxHeight: "90vh",
  overflowY: "auto",
  padding: "20px",
  borderRadius: "12px",
  position: "relative",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "10px",
  fontSize: "24px",
  border: "none",
  background: "none",
  cursor: "pointer",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  flex: 1,
};

const bookBtn = {
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: "#28a745",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  border: "none",
};

export default HotelDetails;
