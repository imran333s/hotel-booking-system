import React, { useState } from "react";
import axios from "axios";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      `${API_URL}/api/blogs`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Blog added successfully");
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h2>Add Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Blog Content"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
