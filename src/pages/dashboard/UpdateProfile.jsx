import { useState, useEffect } from "react";
import axios from "axios";

const UpdateProfile = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put("http://localhost:5000/api/users/profile", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Profile Updated Successfully");
    } catch (err) {
      alert("Failed to update profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Fetch current user data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setForm({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={title}>Update Profile</h3>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        style={input}
        required
      />

      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        style={input}
        required
      />

      <button type="submit" style={button} disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default UpdateProfile;

/* ---------- Styles ---------- */
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "450px",
  margin: "0 auto",
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const title = {
  marginBottom: "20px",
  fontSize: "22px",
  fontWeight: "600",
  textAlign: "center",
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  transition: "border 0.3s",
};

const button = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#007bff",
  color: "#fff",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background 0.3s",
};

button.hover = {
  background: "#0056b3",
};
