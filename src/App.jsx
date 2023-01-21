import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import {
  createBlog,
  getBlogs,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer';
import { checkIfUserLoggedIn, login, logout } from './reducers/userReducer';

function App() {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    dispatch(checkIfUserLoggedIn());
  }, []);

  const handleLogin = async (credentials) => {
    dispatch(login(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNewBlogFormSubmit = async (blogData) => {
    blogFormRef.current.toggleVisible();
    dispatch(createBlog(blogData));
  };

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
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <h1>Blogs</h1>
      {user === null && (
        <Togglable showButtonText={'Login'}>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}
      {user !== null && (
        <>
          <div>
            {user.name} logged in{' '}
            <button onClick={handleLogout}>Log out</button>
          </div>
          <Togglable showButtonText="Create new" ref={blogFormRef}>
            <NewBlogForm onSubmit={handleNewBlogFormSubmit} />
          </Togglable>
        </>
      )}
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
    </div>
  );
}

export default App;
