import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard"; // adjust path if needed
import Loader from "../components/Loader";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [API_URL]);

  if (loading) return <Loader text="Loading Blogs..." />;

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              image={blog.image}
              title={blog.title}
              description={blog.content}
              link={`/blogs/${blog._id}`}
              category={blog.category?.name}
              createdAt={blog.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
