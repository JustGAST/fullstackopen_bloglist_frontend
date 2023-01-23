import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Blog({ blog }) {
  const blogStyle = {
    padding: '5px',
    border: '1px solid black',
    margin: '5px 0',
  };

  return (
    <div className="blog-item" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Blog;
