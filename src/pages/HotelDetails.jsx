import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/hotels/${id}`);
        setHotel(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [API_URL, id]);

  const handleBooking = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Select dates");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/bookings`,
        {
          hotel: hotel._id,
          checkIn,
          checkOut,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Booking successful!");
    } catch (err) {
      alert("Booking failed");
    }
  };

  if (loading) return <Loader text="Loading hotel..." />;
  if (!hotel) return <p>Hotel not found</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>{hotel.name}</h1>
      <p>{hotel.location}</p>
      <p>₹{hotel.pricePerNight} / night</p>

      <h3>Book this hotel</h3>
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />

      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default HotelDetails;
