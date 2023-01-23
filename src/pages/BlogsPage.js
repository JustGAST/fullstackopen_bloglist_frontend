import Blog from '../components/Blog';
import { useSelector } from 'react-redux';

const BlogsPage = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsPage;
