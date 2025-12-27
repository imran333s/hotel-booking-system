import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Luxury Hotels in India",
      description: "Discover the best luxury hotels for a premium stay.",
    },
    {
      id: 2,
      title: "How to Choose the Perfect Hotel",
      description: "Tips to select the right hotel for your next trip.",
    },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1>Blogs</h1>

      <div style={cardContainer}>
        {blogs.map((blog) => (
          <div key={blog.id} style={card}>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>

            <Link to={`/blogs/${blog.id}`} style={readMore}>
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  padding: "20px",
  background: "#fff",
  borderRadius: "6px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const readMore = {
  marginTop: "10px",
  display: "inline-block",
  color: "#2563eb",
  textDecoration: "none",
};

export default Blogs;
