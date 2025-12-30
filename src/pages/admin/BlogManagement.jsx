import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import EditBlogModal from "./EditBlogModal";
import "./BlogManagement.css";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  /* ---------------- FETCH BLOGS ---------------- */

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Failed to load blogs", err);
      Swal.fire("Error!", "Failed to load blogs.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ---------------- EDIT BLOG ---------------- */

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  /* ---------------- DELETE BLOG ---------------- */

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Blog?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      Swal.fire("Deleted!", "Blog deleted successfully.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to delete blog.", "error");
    }
  };

  if (loading) return <Loader text="Loading Blogs..." />;

  return (
    <div className="blog-main-content">
      <h2 className="blog-section-title">Blog Management</h2>

      {/* Blog Table */}
      <table className="blog-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Summary</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-cell">
                No blogs found
              </td>
            </tr>
          ) : (
            blogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td>{blog.title}</td>
                <td className="summary-cell">
                  {blog.summary?.slice(0, 60)}...
                </td>
                <td>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="actions-cell">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(blog)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(blog._id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Blog Modal */}
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
