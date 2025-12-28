import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditHotelModal = ({ hotel, isOpen, onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (hotel) {
      setName(hotel.name);
      setLocation(hotel.location);
      setPrice(hotel.pricePerNight);
    }
  }, [hotel]);

  const handleUpdate = async () => {
    if (!name || !location || !price) return;

    try {
      await axios.put(
        `${API_URL}/api/hotels/${hotel._id}`,
        { name, location, pricePerNight: Number(price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Updated!", "Hotel updated successfully.", "success");
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Failed to update hotel", err);
      Swal.fire("Error!", "Failed to update hotel.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Edit Hotel</h2>
        <input
          placeholder="Hotel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          placeholder="Price per Night"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

export default EditHotelModal;
