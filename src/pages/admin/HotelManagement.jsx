import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import EditHotelModal from "./EditHotelModal"; // create this modal component
import HotelDetails from "./HotelDetails"; // create this drawer/view component
import "./HotelManagement.css";

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  // Fetch hotels
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/hotels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotels(res.data || []);
    } catch (err) {
      console.error("Failed to load hotels", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [API_URL, token]);

  // Add hotel
  const addHotel = async () => {
    if (!name || !location || !price) return;
    try {
      const res = await axios.post(
        `${API_URL}/api/hotels`,
        { name, location, pricePerNight: Number(price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHotels(prev => [...prev, res.data]);
      setName(""); setLocation(""); setPrice("");
      Swal.fire("Added!", "Hotel added successfully.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to add hotel.", "error");
    }
  };

  // View hotel
  const handleView = (id) => {
    setSelectedHotelId(id);
    setViewDrawerOpen(true);
  };

  // Edit hotel
  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setModalOpen(true);
  };

  // Delete hotel
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This hotel will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/hotels/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotels(prev => prev.filter(h => h._id !== id));
        Swal.fire("Deleted!", "Hotel deleted successfully.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete hotel.", "error");
      }
    }
  };

  if (loading) return <Loader text="Loading Hotels..." />;

  return (
    <div className="hotel-main-content">
      <h2 className="hotel-section-title">Hotel Management</h2>

      {/* Add hotel form */}
      <div className="hotel-add-form">
        <input
          placeholder="Hotel Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <input
          placeholder="Price per Night"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button onClick={addHotel}>Add Hotel</button>
      </div>

      {/* Hotel Table */}
      <table className="hotel-list-table">
        <thead>
          <tr>
            <th>S.No</th>
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

      {/* Edit Modal */}
      {modalOpen && selectedHotel && (
        <EditHotelModal
          hotel={selectedHotel}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onUpdate={fetchHotels}
        />
      )}

      {/* View Drawer */}
      <HotelDetails
        hotelId={selectedHotelId}
        isOpen={viewDrawerOpen}
        onClose={() => setViewDrawerOpen(false)}
      />
    </div>
  );
};

export default HotelManagement;
