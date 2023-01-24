import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { Link, useNavigate } from 'react-router-dom';

const BlogPage = ({ blog }) => {
  if (!blog) {
    return;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const onRemoveBlog = () => {
    if (
      !window.confirm(`Really remove blog ${blog.title} by ${blog.author}?`)
    ) {
      return;
    }

    dispatch(removeBlog(blog));
    navigate('/');
  };

  const onLikeBlog = () => {
    dispatch(likeBlog(blog));
  };

  return (
    <>
      <h3>{blog.title}</h3>
      <div className="blog-url">{blog.url}</div>
      <div className="blog-likes">
        Likes: {blog.likes} <button onClick={onLikeBlog}>Like</button>
      </div>
      <div>added by {blog.user && blog.user.name}</div>

      {user && blog.user && user.username === blog.user.username && (
        <button onClick={onRemoveBlog}>Remove</button>
      )}

      <h4>Comments</h4>
      {blog.comments.length === 0 && <div>No comments yet</div>}
      {blog.comments.length > 0 && (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}

      <div>
        <Link to={'/'}>back</Link>
      </div>
    </>
  );
};

export default BlogPage;
