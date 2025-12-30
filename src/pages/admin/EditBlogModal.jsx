import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditBlogModal = ({ blog, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        summary: blog.summary || "",
        content: blog.content || "",
        image: blog.image || "",
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { title, summary, content, image } = formData;

    if (!title || !summary || !content || !image) {
      Swal.fire("Error!", "All fields are required.", "error");
      return;
    }

    try {
      await axios.put(`${API_URL}/api/blogs/${blog._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Updated!", "Blog updated successfully.", "success");
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update blog.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={titleStyle}>Edit Blog</h2>

        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          style={input}
        />

        <textarea
          name="summary"
          placeholder="Short Summary"
          rows="3"
          value={formData.summary}
          onChange={handleChange}
          style={textarea}
        />

        <textarea
          name="content"
          placeholder="Blog Content"
          rows="5"
          value={formData.content}
          onChange={handleChange}
          style={textarea}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          style={input}
        />

        <div style={actions}>
          <button onClick={handleUpdate} style={saveBtn}>
            Save Changes
          </button>
          <button onClick={onClose} style={cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const modal = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  width: "480px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

const titleStyle = {
  marginBottom: "10px",
  textAlign: "center",
  color: "#1f2937",
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

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "10px",
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelBtn = {
  background: "#e5e7eb",
  color: "#374151",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default EditBlogModal;
