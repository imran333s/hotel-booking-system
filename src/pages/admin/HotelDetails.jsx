import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

const HotelDetails = ({ hotelId, isOpen, onClose }) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!hotelId || !isOpen) return;

    const fetchHotel = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/hotels/${hotelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotel(res.data);
      } catch (err) {
        console.error("Failed to fetch hotel", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId, isOpen, API_URL, token]);

  if (!isOpen) return null;
  if (loading) return <Loader text="Loading hotel details..." />;

  if (!hotel) return <p style={{ padding: "20px" }}>Hotel not found</p>;

  return (
    <div style={drawerOverlay}>
      <div style={drawerStyle}>
        <button onClick={onClose} style={closeBtn}>
          ×
        </button>
        <h2>{hotel.name}</h2>
        <p><strong>Location:</strong> {hotel.location}</p>
        <p><strong>Price / Night:</strong> ₹{hotel.pricePerNight}</p>
        <p><strong>Rooms:</strong> {hotel.rooms}</p>
        {hotel.description && <p><strong>Description:</strong> {hotel.description}</p>}
        <p><strong>Created At:</strong> {new Date(hotel.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const drawerOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 2000,
};

const drawerStyle = {
  background: "#fff",
  width: "400px",
  padding: "20px",
  height: "100%",
  overflowY: "auto",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "10px",
  fontSize: "22px",
  border: "none",
  background: "none",
  cursor: "pointer",
};

export default HotelDetails;
