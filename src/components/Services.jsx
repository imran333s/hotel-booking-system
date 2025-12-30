import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Services = () => {
  const [hotels, setHotels] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/hotels`);
        setHotels(res.data || []);
      } catch (err) {
        console.error("Failed to fetch hotels:", err);
      }
    };

    const fetchWishlist = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_URL}/api/users/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data || []);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchHotels();
    fetchWishlist().finally(() => setLoading(false));
  }, [API_URL, token]);

  const toggleWishlist = async (hotel) => {
    if (!token) {
      alert("Please login to use wishlist");
      return;
    }

    try {
      const isWishlisted = wishlist.some((h) => h._id === hotel._id);

      if (isWishlisted) {
        await axios.delete(`${API_URL}/api/users/wishlist/${hotel._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist((prev) => prev.filter((h) => h._id !== hotel._id));
      } else {
        await axios.post(
          `${API_URL}/api/users/wishlist/${hotel._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWishlist((prev) => [...prev, hotel]);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  if (loading) return <Loader text="Loading Hotels..." />;

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Available Hotels
      </h1>

      {hotels.length === 0 ? (
        <p>No hotels available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {hotels.map((hotel) => {
            // Determine image
            let imageSrc = "https://source.unsplash.com/600x400/?hotel,room";
            if (hotel.images && hotel.images.length > 0) {
              const firstImg = hotel.images[0];
              if (firstImg.startsWith("data:")) imageSrc = firstImg;
              else if (firstImg.startsWith("http")) imageSrc = firstImg;
              else imageSrc = `data:image/jpeg;base64,${firstImg}`;
            }

            const isWishlisted = wishlist.some((h) => h._id === hotel._id);

            return (
              <div
                key={hotel._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {/* Wishlist Button on top-right */}
                {token && (
                  <button
                    onClick={() => toggleWishlist(hotel)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      padding: "6px 10px",
                      borderRadius: "50%",
                      border: "none",
                      backgroundColor: isWishlisted ? "#dc3545" : "#28a745",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {isWishlisted ? "♥" : "♡"}
                  </button>
                )}

                {/* Image */}
                <img
                  src={imageSrc}
                  alt={hotel.name}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />

                {/* Content */}
                <div
                  style={{
                    padding: "15px",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>{hotel.name}</h3>
                  <p style={{ margin: 0, color: "#555" }}>
                    📍 {hotel.location}
                  </p>
                  <p style={{ margin: 0, fontWeight: "600" }}>
                    ₹{hotel.pricePerNight} / night
                  </p>
                  {hotel.rating && (
                    <p style={{ margin: 0 }}>
                      ⭐ {hotel.rating.toFixed(1)} / 5
                    </p>
                  )}

                  {/* Booking / View Buttons */}
                  <div
                    style={{ marginTop: "auto", display: "flex", gap: "10px" }}
                  >
                    <Link
                      to={`/hotels/${hotel._id}`}
                      style={{
                        flex: 1,
                        textDecoration: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      View Details
                    </Link>

                    <Link
                      to={`/hotels/${hotel._id}?action=book`}
                      style={{
                        flex: 1,
                        textDecoration: "none",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Services;
