// src/pages/admin/AdminHeader.jsx
import React, { useContext } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";

const AdminHeader = ({ websiteName }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // clears auth globally
        navigate("/"); // redirect to public home
        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  if (!user) return null; // hide header if not logged in

  return (
    <header className="admin-header">
      <div className="website-name">{websiteName}</div>

      <div className="header-right">
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-role">({user.role})</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
