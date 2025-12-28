import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditBlogModal = ({ blog, isOpen, onClose, onUpdate }) => {
  const [title, setTitle] = useState(blog.title || "");
  const [content, setContent] = useState(blog.content || "");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContent(blog.content || "");
    }
  }, [blog]);

  const handleUpdate = async () => {
    if (!title || !content) {
      Swal.fire("Error!", "Both title and content are required.", "error");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/api/blogs/${blog._id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Edit Blog</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

export default EditBlogModal;
