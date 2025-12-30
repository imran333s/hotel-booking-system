import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import "./HotelDetails.css";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token"); // user auth token

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
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to book a hotel.",
      });
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      Swal.fire({
        icon: "error",
        title: "Dates Required",
        text: "Please select check-in and check-out dates.",
      });
      return;
    }

    try {
      // POST booking to backend
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

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        text: `Your booking at ${hotel.name} from ${checkIn} to ${checkOut} was successful.`,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  if (loading) return <Loader text="Loading Hotel..." />;
  if (!hotel) return <p>Hotel not found</p>;

  return (
    <div className="hotel-details-container">
      <div className="hotel-images">
        {hotel.images?.length ? (
          hotel.images.map((img, idx) => (
            <img
              key={idx}
              src={
                img.startsWith("http") ? img : `data:image/jpeg;base64,${img}`
              }
              alt={`${hotel.name} ${idx + 1}`}
            />
          ))
        ) : (
          <img
            src="https://source.unsplash.com/600x400/?hotel,room"
            alt="default hotel"
          />
        )}
      </div>

      <div className="hotel-booking-card">
        <h2>{hotel.name}</h2>
        <p className="location">{hotel.location}</p>
        <p>{hotel.address}</p>
        <p className="rating">⭐ {hotel.rating || 4} / 5</p>
        <p className="rooms-available">
          Rooms Available: {hotel.roomsAvailable}
        </p>
        <p className="price">₹{hotel.pricePerNight} / night</p>

        <div className="dates">
          <label>Check-in:</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <label>Check-out:</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <ul className="amenities">
          {hotel.amenities?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <button className="book-btn" onClick={handleBooking}>
          BOOK THIS NOW
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;
