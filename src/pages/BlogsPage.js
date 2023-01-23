import Blog from '../components/Blog';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';

const BlogsPage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const handleRemoveBlog = (blog) => () => {
    if (
      !window.confirm(`Really remove blog ${blog.title} by ${blog.author}?`)
    ) {
      return;
    }

    dispatch(removeBlog(blog));
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          onLikeBlog={() => dispatch(likeBlog(blog))}
          onRemoveBlog={handleRemoveBlog(blog)}
        />
      ))}
    </div>
  );
};

export default BlogsPage;
