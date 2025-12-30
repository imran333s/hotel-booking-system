import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./EditHotelModal.css";

const EditHotelModal = ({ hotel, isOpen, onClose, onUpdate }) => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

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
    checkInTime: "",
    checkOutTime: "",
  });

  /* ===== LOAD HOTEL DATA ===== */
  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || "",
        location: hotel.location || "",
        address: hotel.address || "",
        description: hotel.description || "",
        pricePerNight: hotel.pricePerNight || "",
        rating: hotel.rating || 4,
        roomsAvailable: hotel.roomsAvailable || "",
        amenities: (hotel.amenities || []).join(", "),
        images: (hotel.images || []).join(", "),
        checkInTime: hotel.checkInTime || "12:00 PM",
        checkOutTime: hotel.checkOutTime || "11:00 AM",
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ===== UPDATE ===== */
  const handleUpdate = async () => {
    try {
      const payload = {
        ...formData,
        pricePerNight: Number(formData.pricePerNight),
        rating: Number(formData.rating),
        roomsAvailable: Number(formData.roomsAvailable),
        amenities: formData.amenities.split(",").map(a => a.trim()),
        images: formData.images.split(",").map(i => i.trim()),
      };

      await axios.put(
        `${API_URL}/api/hotels/${hotel._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Updated!", "Hotel updated successfully.", "success");
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update hotel.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h2 className="edit-modal-title">Edit Hotel</h2>

        <div className="edit-form-grid">
          {/* Row 1 */}
          <input name="name" placeholder="Hotel Name" value={formData.name} onChange={handleChange} />
          <input name="location" placeholder="City / Location" value={formData.location} onChange={handleChange} />
          <input name="pricePerNight" type="number" placeholder="Price / Night" value={formData.pricePerNight} onChange={handleChange} />
          <input name="rating" type="number" min="0" max="5" step="0.1" placeholder="Rating" value={formData.rating} onChange={handleChange} />

          {/* Row 2 */}
          <input name="roomsAvailable" type="number" placeholder="Rooms Available" value={formData.roomsAvailable} onChange={handleChange} />
          <input name="checkInTime" placeholder="Check-in Time" value={formData.checkInTime} onChange={handleChange} />
          <input name="checkOutTime" placeholder="Check-out Time" value={formData.checkOutTime} onChange={handleChange} />
          <input name="location" placeholder="Area / Landmark" value={formData.location} onChange={handleChange} />

          {/* Row 3 */}
          <input name="amenities" className="span-2" placeholder="Amenities (WiFi, AC, Pool)" value={formData.amenities} onChange={handleChange} />
          <input name="images" className="span-2" placeholder="Image URLs" value={formData.images} onChange={handleChange} />

          {/* Row 4 */}
          <input name="address" className="span-4" placeholder="Full Address" value={formData.address} onChange={handleChange} />
          <textarea name="description" className="span-4" placeholder="Description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="edit-modal-actions">
          <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditHotelModal;
