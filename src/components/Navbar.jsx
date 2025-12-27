import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Navbar.css";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Hotel Booking System</h1>
        <nav className="nav-links">
          {/* Common links for everyone */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact</Link>

          {!user ? (
            <>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn-outline" to="/register">Register</Link>
            </>
          ) : (
            <>
              <span className="username">Hi, {user.name}</span>

              {/* Dashboard link based on role */}
              {user.role === "Super Admin" && <Link to="/dashboard/admin">Dashboard</Link>}
              {user.role === "User" && <Link to="/dashboard/user">Dashboard</Link>}
              {["Manager","Receptionist","Waiter","Cook"].includes(user.role) && (
                <Link to="/dashboard/employee">Dashboard</Link>
              )}

              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
