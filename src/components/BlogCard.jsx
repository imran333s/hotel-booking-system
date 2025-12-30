import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  const { image, title, summary, content, createdAt, _id, category } = blog;

  // Truncate text for snippet
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="blog-card">
      <div className="blog-image">
        <img
          src={image || "/fallback-image.png"}
          alt={title}
          onError={(e) => (e.target.src = "/fallback-image.png")}
        />
      </div>

      <div className="blog-header">
        <h3>{title}</h3>
        <span className="blog-category">{category || "General"}</span>
      </div>

      <p className="content-snippet">{truncateText(summary || content, 120)}</p>

      <div className="blog-footer">
        <Link to={`/blogs/${_id}`} className="read-more">
          Read More <i className="fas fa-arrow-right"></i>
        </Link>
        <span className="blog-time">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default BlogCard;
