import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/hotels/${id}`);
        setHotel(res.data);
      } catch (err) {
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [API_URL, id]);

  const handleBooking = () => {
    if (!user) {
      navigate("/login", { state: { from: `/hotels/${id}` } });
      return;
    }

    navigate("/booking/confirm", {
      state: { hotel, checkIn, checkOut, guests },
    });
  };

  if (loading) return <Loader text="Loading hotel..." />;
  if (!hotel) return <p>Hotel not found</p>;

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "40px" }}>
      <h1>{hotel.name}</h1>

      <img
        src={hotel.image}
        alt={hotel.name}
        style={{ width: "100%", borderRadius: "12px" }}
      />

      <p>{hotel.description}</p>
      <h3>₹{hotel.pricePerNight} / night</h3>

      {/* BOOKING CARD */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h3>Book Your Stay</h3>

        <label>Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        <label>Guests</label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />

        <button onClick={handleBooking} style={{ marginTop: "15px" }}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;
