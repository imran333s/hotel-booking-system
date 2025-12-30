import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import EditHotelModal from "./EditHotelModal";
import HotelDetails from "./HotelDetails";
import "./HotelManagement.css";

const HotelManagement = ({ setActivePage }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  /* ===== FETCH HOTELS ===== */
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/hotels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotels(res.data || []);
    } catch (err) {
      console.error("Failed to fetch hotels", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  /* ===== ACTIONS ===== */
  const handleView = (id) => {
    setSelectedHotelId(id);
    setViewDrawerOpen(true);
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Hotel?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/hotels/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotels((prev) => prev.filter((h) => h._id !== id));
        Swal.fire("Deleted!", "Hotel removed successfully.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete hotel.", "error");
      }
    }
  };

  if (loading) return <Loader text="Loading Hotels..." />;

  return (
    <div className="hotel-main-content">
      {/* ===== HEADER ===== */}
      <div className="hotel-header">
        <h2 className="hotel-section-title">Hotel Management</h2>

        <button
          className="primary-btn"
          onClick={() => setActivePage("addHotel")}
        >
          ➕ Add Hotel
        </button>
      </div>

      {/* ===== HOTEL TABLE ===== */}
      <table className="hotel-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price / Night</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {hotels.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No hotels found
              </td>
            </tr>
          ) : (
            hotels.map((hotel, index) => (
              <tr key={hotel._id}>
                <td>{index + 1}</td>
                <td>{hotel.name}</td>
                <td>{hotel.location}</td>
                <td>₹{hotel.pricePerNight}</td>
                <td className="actions-cell">
                  <button onClick={() => handleView(hotel._id)}>👁️</button>
                  <button onClick={() => handleEdit(hotel)}>✏️</button>
                  <button onClick={() => handleDelete(hotel._id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ===== EDIT MODAL ===== */}
      {modalOpen && selectedHotel && (
        <EditHotelModal
          hotel={selectedHotel}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onUpdate={fetchHotels}
        />
      )}

      {/* ===== VIEW DRAWER ===== */}
      <HotelDetails
        hotelId={selectedHotelId}
        isOpen={viewDrawerOpen}
        onClose={() => setViewDrawerOpen(false)}
      />
    </div>
  );
};

export default HotelManagement;
