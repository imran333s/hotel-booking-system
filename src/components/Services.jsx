import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Services = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/hotels`);
        setHotels(res.data || []);
      } catch (err) {
        console.error("Failed to fetch hotels:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [API_URL]);

  if (loading) return <Loader text="Loading Hotels..." />;

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
      <h1>Available Hotels</h1>

      {hotels.length === 0 ? (
        <p>No hotels available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p>₹{hotel.pricePerNight} / night</p>
              <Link to={`/hotels/${hotel._id}`} style={{ color: "#111827", fontWeight: "bold" }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
