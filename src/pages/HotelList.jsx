import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/hotels`);
        setHotels(res.data || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchHotels();
  }, [API_URL]);

  if (loading) return <Loader text="Loading Hotels..." />;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Hotels</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" }}>
        {hotels.length === 0 ? <p>No hotels available</p> :
          hotels.map(hotel => (
            <div key={hotel._id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px" }}>
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p>₹{hotel.pricePerNight} / night</p>
              <Link to={`/hotels/${hotel._id}`}>View Details</Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default HotelList;
