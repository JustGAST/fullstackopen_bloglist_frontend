import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from '../components/Blog';
import NewBlogForm from '../components/NewBlogForm';
import Togglable from '../components/Togglable';
import { createBlog } from '../reducers/blogReducer';
import { Stack } from 'react-bootstrap';

const BlogsPage = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  const handleNewBlogFormSubmit = async (blogData) => {
    blogFormRef.current.toggleVisible();
    dispatch(createBlog(blogData));
  };

  return (
    <div>
      <Stack gap={2}>
        {user && (
          <Togglable showButtonText="Create new" ref={blogFormRef}>
            <NewBlogForm onSubmit={handleNewBlogFormSubmit} />
          </Togglable>
        )}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </Stack>
    </div>
  );
};

export default BlogsPage;
