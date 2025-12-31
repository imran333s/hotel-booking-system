import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelsReq = axios.get(`${API_URL}/api/hotels`);
        const wishlistReq = token
          ? axios.get(`${API_URL}/api/users/wishlist`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: [] });

        const [hotelsRes, wishlistRes] = await Promise.all([
          hotelsReq,
          wishlistReq,
        ]);

        setHotels(hotelsRes.data || []);
        setWishlist(wishlistRes.data || []);
      } catch (err) {
        console.error("Error loading hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL, token]);

  const toggleWishlist = async (hotel) => {
    if (!token) {
      alert("Please login to use wishlist");
      return;
    }

    const isWishlisted = wishlist.some((h) => h._id === hotel._id);

    try {
      if (isWishlisted) {
        await axios.delete(`${API_URL}/api/users/wishlist/${hotel._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist((prev) => prev.filter((h) => h._id !== hotel._id));
      } else {
        await axios.post(
          `${API_URL}/api/users/wishlist/${hotel._id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
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
        Explore Hotels
      </h1>

      {hotels.length === 0 ? (
        <p style={{ textAlign: "center" }}>No hotels available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {hotels.map((hotel) => {
            // Image handling (robust)
            let imageSrc = "https://source.unsplash.com/600x400/?hotel,room";
            if (hotel.images && hotel.images.length > 0) {
              const img = hotel.images[0];
              if (img.startsWith("http")) imageSrc = img;
              else if (img.startsWith("data:")) imageSrc = img;
              else imageSrc = `data:image/jpeg;base64,${img}`;
            }

            const isWishlisted = wishlist.some((h) => h._id === hotel._id);

            return (
              <div
                key={hotel._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Wishlist */}
                {token && (
                  <button
                    onClick={() => toggleWishlist(hotel)}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      border: "none",
                      borderRadius: "50%",
                      padding: "6px 10px",
                      cursor: "pointer",
                      background: isWishlisted ? "#dc3545" : "#28a745",
                      color: "#fff",
                      fontSize: "16px",
                    }}
                  >
                    {isWishlisted ? "♥" : "♡"}
                  </button>
                )}

                {/* Image */}
                <img
                  src={imageSrc}
                  alt={hotel.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    flex: 1,
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

                  {/* Actions */}
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Link
                      to={`/hotels/${hotel._id}`}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        background: "#007bff",
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      View Details
                    </Link>

                    <Link
                      to={`/hotels/${hotel._id}?action=book`}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        background: "#28a745",
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontWeight: "600",
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

export default Hotels;
