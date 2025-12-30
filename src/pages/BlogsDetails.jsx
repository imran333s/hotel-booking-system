import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [API_URL, id]);

  if (loading) return <Loader text="Loading blog..." />;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px" }}>
      <h1>{blog.title}</h1>
      <img
        src={blog.image}
        alt={blog.title}
        style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }}
      />
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
