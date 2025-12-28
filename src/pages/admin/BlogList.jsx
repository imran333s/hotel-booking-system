import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBlogs(res.data));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div>
      <h2>Blog List</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>
                <button onClick={() => handleDelete(blog._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
