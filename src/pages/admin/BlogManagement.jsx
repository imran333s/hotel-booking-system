import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import EditBlogModal from "./EditBlog"; // Create this modal for editing
import "./BlogManagement.css";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [API_URL, token]);

  // Add blog
  const addBlog = async () => {
    if (!title || !content) return;
    try {
      const res = await axios.post(
        `${API_URL}/api/blogs`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs(prev => [...prev, res.data]);
      setTitle(""); setContent("");
      Swal.fire("Added!", "Blog added successfully.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to add blog.", "error");
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  // Delete blog
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(prev => prev.filter(b => b._id !== id));
        Swal.fire("Deleted!", "Blog deleted successfully.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete blog.", "error");
      }
    }
  };

  if (loading) return <Loader text="Loading Blogs..." />;

  return (
    <div className="blog-main-content">
      <h2 className="blog-section-title">Blog Management</h2>

      {/* Add Blog */}
      <div className="blog-add-form">
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
        <button onClick={addBlog}>Add Blog</button>
      </div>

      {/* Blog Table */}
      <table className="blog-list-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>No blogs found</td>
            </tr>
          ) : (
            blogs.map((b, index) => (
              <tr key={b._id}>
                <td>{index + 1}</td>
                <td>{b.title}</td>
                <td className="actions-cell">
                  <button onClick={() => handleEdit(b)}>✏️</button>
                  <button onClick={() => handleDelete(b._id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {modalOpen && selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onUpdate={fetchBlogs}
        />
      )}
    </div>
  );
};

export default BlogManagement;
