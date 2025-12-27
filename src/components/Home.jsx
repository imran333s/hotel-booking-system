import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>
          <p>
            Book hotels, resorts, and rooms at the best prices with comfort and
            convenience.
          </p>
          <Link to="/services" className="hero-btn">
            Explore Hotels
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Best Prices</h3>
            <p>Get affordable hotel deals with no hidden charges.</p>
          </div>
          <div className="feature-card">
            <h3>Easy Booking</h3>
            <p>Book your stay in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>We are always here to help you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
