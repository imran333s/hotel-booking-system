import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ image, title, description, link, category, createdAt }) => {
  // Truncate HTML content safely
  const truncateHTML = (html, maxLength) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="blog-card">
      <div className="blog-image">
        <img
          src={image || "/fallback-image.png"}
          alt={title}
          onError={(e) => (e.target.src = "/fallback-image.png")}
          loading="lazy" // ✅ Lazy load images
        />
      </div>

      <div className="blog-header">
        <h3>{title}</h3>
        <span className="blog-category">{category || "Uncategorized"}</span>
      </div>

      <p className="content-snippet">{truncateHTML(description, 120)}</p>

      <div className="blog-footer">
        <Link to={link} className="read-more">
          Read More →
        </Link>
        <span className="blog-time">{formatTime(createdAt)}</span>
      </div>
    </div>
  );
};

export default BlogCard;
