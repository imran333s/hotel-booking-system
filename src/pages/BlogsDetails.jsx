import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px", lineHeight: "1.8" }}>
      <h1>Blog Title {id}</h1>

      <p style={{ marginTop: "15px" }}>
        This is the detailed blog content for blog ID {id}. Here you can write
        full blog information with headings, images, and descriptions.
      </p>

      <p style={{ marginTop: "10px" }}>
        Clean readability and proper spacing are important for user experience.
      </p>
    </div>
  );
};

export default BlogDetails;
