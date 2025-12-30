import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./AddHotel.css";

const AddHotel = ({ setActivePage }) => {
  const navigate = useNavigate();

  /* ===== FORM STATE ===== */
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    description: "",
    pricePerNight: "",
    rating: 4,
    roomsAvailable: "",
    amenities: "",
    images: "",
    checkInTime: "12:00 PM",
    checkOutTime: "11:00 AM",
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  /* ===== HANDLE CHANGE ===== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.pricePerNight) {
      Swal.fire("Required!", "Name, location & price are mandatory", "warning");
      return;
    }

    try {
      const payload = {
        ...formData,
        pricePerNight: Number(formData.pricePerNight),
        rating: Number(formData.rating),
        roomsAvailable: Number(formData.roomsAvailable),
        amenities: formData.amenities.split(",").map((a) => a.trim()),
        images: formData.images.split(",").map((i) => i.trim()),
      };

      await axios.post(`${API_URL}/api/hotels`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Success!", "Hotel added successfully", "success");
      // ✅ ADD THIS LINE HERE
      setActivePage("hotels");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to add hotel", "error");
    }
  };

  return (
    <div className="add-hotel-container">
      <h2 className="add-hotel-title">Add New Hotel</h2>

      <form className="add-hotel-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Hotel Name" onChange={handleChange} />
        <input
          name="location"
          placeholder="City / Location"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Full Address"
          className="add-hotel-full"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Hotel Description"
          className="add-hotel-full"
          onChange={handleChange}
        />

        <input
          name="pricePerNight"
          type="number"
          placeholder="Price per Night"
          onChange={handleChange}
        />

        <input
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Rating (0–5)"
          onChange={handleChange}
        />

        <input
          name="roomsAvailable"
          type="number"
          placeholder="Rooms Available"
          onChange={handleChange}
        />

        <input
          name="amenities"
          placeholder="Amenities (WiFi, AC, Pool)"
          className="add-hotel-full"
          onChange={handleChange}
        />

        <input
          name="images"
          placeholder="Image URLs (comma separated)"
          className="add-hotel-full"
          onChange={handleChange}
        />

        <input
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
        />

        <input
          name="checkOutTime"
          value={formData.checkOutTime}
          onChange={handleChange}
        />

        <div className="add-hotel-actions">
          <button type="submit" className="add-hotel-submit">
            ➕ Add Hotel
          </button>
          <button
            type="button"
            className="add-hotel-cancel"
            onClick={() => setActivePage("hotels")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
