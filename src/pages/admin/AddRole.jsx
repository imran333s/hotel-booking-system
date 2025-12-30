// src/pages/admin/AddRole.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";

const AddRole = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const addRole = async () => {
    if (!roleName) return;
    try {
      const res = await axios.post(
        `${API_URL}/api/roles`,
        { name: roleName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRoles((prev) => [...prev, res.data]);
      setRoleName("");
      Swal.fire("Success", "Role added successfully", "success");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to add role",
        "error"
      );
    }
  };

  if (loading) return <Loader text="Loading roles..." />;

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Manage Roles</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="New Role"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addRole}
          style={{
            padding: "10px 15px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <ul>
        {roles.map((r) => (
          <li key={r._id} style={{ marginBottom: "8px" }}>
            {r.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddRole;
