import React from "react";

const AdminHeader = ({ adminName, role, onLogout }) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 20px",
        background: "#111827",
        color: "#fff",
        alignItems: "center",
      }}
    >
      <div>
        <h3>Welcome, {adminName} ({role})</h3>
      </div>
      <button
        onClick={onLogout}
        style={{
          padding: "8px 15px",
          background: "#ef4444",
          border: "none",
          borderRadius: "5px",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
