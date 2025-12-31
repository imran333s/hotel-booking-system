// src/components/Navbar.jsx
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (loading) return null;

  return (
    <header
      className={`navbar 
        ${scrolled ? "scrolled" : ""} 
        ${!isHomePage ? "navbar-solid" : ""}
      `}
    >
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">HotelBooking</Link>
        </div>

        {/* ✅ HAMBURGER (ONLY ADDITION) */}
        <div
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </div>

        {/* Nav Menu (UNCHANGED CONTENT) */}
        <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            {/* PRIMARY CTA */}
            <li>
              <Link to="/hotels">Hotels</Link>
            </li>

            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link className="login-btn" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="register-btn" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="username">Hi, {user.name}</li>

                {user.role === "Super Admin" && (
                  <li>
                    <Link to="/dashboard/admin">Dashboard</Link>
                  </li>
                )}
                {user.role === "User" && (
                  <li>
                    <Link to="/dashboard/user">Dashboard</Link>
                  </li>
                )}

                <li>
                  <button className="login-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
