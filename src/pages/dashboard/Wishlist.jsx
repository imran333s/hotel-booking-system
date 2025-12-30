import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data || []);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (hotelId) => {
    try {
      await axios.delete(`${API_URL}/api/users/wishlist/${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((h) => h._id !== hotelId));
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  if (loading) return <Loader text="Loading Wishlist..." />;

  if (wishlist.length === 0)
    return <p style={{ textAlign: "center" }}>No hotels in your wishlist.</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>My Wishlist</h2>
      <div style={hotelGrid}>
        {wishlist.map((hotel) => (
          <div key={hotel._id} style={hotelCard}>
            <img
              src={
                hotel.images && hotel.images.length > 0
                  ? hotel.images[0].startsWith("http")
                    ? hotel.images[0]
                    : `data:image/jpeg;base64,${hotel.images[0]}`
                  : "https://source.unsplash.com/600x400/?hotel,room"
              }
              alt={hotel.name}
              style={hotelImage}
            />
            <div style={hotelInfo}>
              <h3 style={{ margin: "0 0 6px 0" }}>{hotel.name}</h3>
              <p style={{ color: "#555", margin: "0 0 6px 0" }}>
                📍 {hotel.location}
              </p>
              <p style={{ fontWeight: "600", margin: "0 0 6px 0" }}>
                ₹{hotel.pricePerNight} / night
              </p>
              {hotel.rating && (
                <p style={{ margin: "0 0 10px 0" }}>
                  ⭐ {hotel.rating.toFixed(1)} / 5
                </p>
              )}

              <div style={buttonRow}>
                <button
                  style={removeButton}
                  onClick={() => removeFromWishlist(hotel._id)}
                >
                  Remove
                </button>
                <Link
                  to={`/hotels/${hotel._id}?action=book`}
                  style={bookButton}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

/* ---------- Styles ---------- */
const hotelGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "25px",
};

const hotelCard = {
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const hotelImage = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
};

const hotelInfo = {
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  marginTop: "auto",
};

const removeButton = {
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#dc3545",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  flex: "none", // ensures button only takes its content width
  transition: "background 0.3s ease",
};

const bookButton = {
  padding: "8px 14px",
  borderRadius: "6px",
  backgroundColor: "#28a745",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  textAlign: "center",
  flex: "none", // button width based on content
  transition: "background 0.3s ease",
};
