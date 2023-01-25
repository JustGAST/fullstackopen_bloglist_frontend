import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function Blog({ blog }) {
  return (
    <Card>
      <Card.Body>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </Card.Body>
    </Card>
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
