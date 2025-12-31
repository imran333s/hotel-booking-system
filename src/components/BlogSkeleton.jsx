import "./BlogSkeleton.css";

const BlogSkeleton = () => {
  return (
    <div className="blog-skeleton">
      <div className="skeleton-image shimmer"></div>

      <div className="skeleton-content">
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-text shimmer"></div>
        <div className="skeleton-text short shimmer"></div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
