import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "./HotelList.css";

const HotelList = () => {
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
        console.error("Failed to load hotels", err);
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
        console.error("Failed to load wishlist", err);
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
        await axios.post(`${API_URL}/api/users/wishlist/${hotel._id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist((prev) => [...prev, hotel]);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  if (loading) return <Loader text="Loading Hotels..." />;

  if (hotels.length === 0)
    return <p className="empty-text">No hotels available</p>;

  return (
    <div className="hotel-page">
      <h2 className="page-title">Available Hotels</h2>
      <div className="hotel-grid">
        {hotels.map((hotel) => {
          let imageSrc = "https://source.unsplash.com/600x400/?hotel,room";
          if (hotel.images && hotel.images.length > 0) {
            const firstImg = hotel.images[0];
            imageSrc = firstImg.startsWith("data:")
              ? firstImg
              : firstImg.startsWith("http")
              ? firstImg
              : `data:image/jpeg;base64,${firstImg}`;
          }

          const isWishlisted = wishlist.some((h) => h._id === hotel._id);

          return (
            <div className="hotel-card" key={hotel._id}>
              <img src={imageSrc} alt={hotel.name} className="hotel-image" />

              <div className="hotel-info">
                <h3 className="hotel-name">{hotel.name}</h3>
                <p className="hotel-location">📍 {hotel.location}</p>

                <div className="hotel-rating">
                  ⭐ {hotel.rating?.toFixed(1) || "4.0"} / 5
                </div>

                <p className="hotel-amenities">
                  {hotel.amenities?.slice(0, 3).join(" • ")}
                </p>

                {/* Fixed footer layout */}
                <div className="hotel-footer">
                  <div className="price-wishlist">
                    <div className="hotel-price">
                      ₹{hotel.pricePerNight}<span>/night</span>
                    </div>

                    <button
                      className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
                      onClick={() => toggleWishlist(hotel)}
                    >
                      {isWishlisted ? "♥ Remove" : "♡ Add"}
                    </button>
                  </div>

                  <Link to={`/hotels/${hotel._id}`} className="view-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelList;
