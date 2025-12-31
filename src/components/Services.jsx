import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <h1>Our Services</h1>
        <p>
          Everything you need for a smooth, secure, and reliable hotel booking
          experience.
        </p>
      </section>

      {/* Services Grid */}
      <section className="services-grid">
        <div className="service-card">
          <h3>🏨 Hotel Discovery</h3>
          <p>
            Browse hotels by city, price, rating, and amenities. Find the
            perfect stay for every trip.
          </p>
        </div>

        <div className="service-card">
          <h3>🔍 Advanced Search & Filters</h3>
          <p>
            Filter hotels by budget, location, ratings, and availability to make
            faster decisions.
          </p>
        </div>

        <div className="service-card">
          <h3>❤️ Wishlist</h3>
          <p>
            Save your favorite hotels and access them anytime from your
            dashboard.
          </p>
        </div>

        <div className="service-card">
          <h3>📅 Easy Booking</h3>
          <p>
            Book hotels instantly with real-time availability and secure
            confirmation.
          </p>
        </div>

        <div className="service-card">
          <h3>👤 User Dashboard</h3>
          <p>
            Manage your profile, view booking history, and track your saved
            hotels.
          </p>
        </div>

        <div className="service-card">
          <h3>🛠️ Admin Management</h3>
          <p>
            Admins can manage hotels, users, bookings, and platform content
            efficiently.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <h2>Ready to book your next stay?</h2>
        <Link to="/hotels" className="cta-btn">
          Explore Hotels
        </Link>
      </section>
    </div>
  );
};

export default Services;
