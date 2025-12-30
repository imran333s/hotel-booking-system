import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading blogs...</p>;

  return (
    <div className="blogs-page">
      <h2>Latest Blogs</h2>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
