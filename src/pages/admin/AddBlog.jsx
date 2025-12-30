import React, { useState } from "react";
import axios from "axios";

const AddBlog = ({ setActivePage }) => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  console.log("ENV API URL:", process.env.REACT_APP_API_URL);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/blogs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Blog added successfully ✅");
      setFormData({
        title: "",
        summary: "",
        content: "",
        image: "",
      });
      setActivePage("blogs");
    } catch (err) {
      alert("Failed to add blog ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <h2 style={heading}>Add New Blog</h2>

      <form onSubmit={handleSubmit} style={form}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={input}
        />

        <textarea
          name="summary"
          placeholder="Short Summary (for blog cards)"
          value={formData.summary}
          onChange={handleChange}
          rows="3"
          required
          style={textarea}
        />

        <textarea
          name="content"
          placeholder="Full Blog Content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          required
          style={textarea}
        />

        <input
          type="text"
          name="image"
          placeholder="Blog Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          style={input}
        />

        <button type="submit" disabled={loading} style={button}>
          {loading ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const container = {
  maxWidth: "600px",
  margin: "auto",
  background: "#ffffff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const heading = {
  marginBottom: "20px",
  textAlign: "center",
  color: "#1f2937",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const input = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
};

const textarea = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  resize: "vertical",
};

const button = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#16a34a",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
};

export default AddBlog;
