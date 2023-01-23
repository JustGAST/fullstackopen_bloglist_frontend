import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useMatch } from 'react-router-dom';

import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { createBlog, getBlogs } from './reducers/blogReducer';
import { checkIfUserLoggedIn, login, logout } from './reducers/userReducer';
import BlogsPage from './pages/BlogsPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import { getUsers } from './reducers/usersReducer';
import BlogPage from './pages/BlogPage';

function App() {
  const dispatch = useDispatch();
  const userMatch = useMatch('/users/:id');
  const blogMatch = useMatch('/blogs/:id');

  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const userOnPage =
    userMatch && users
      ? users.find((currentUser) => currentUser.id === userMatch.params.id)
      : null;

  const blogOnPage = blogMatch
    ? blogs.find((currentBlog) => currentBlog.id === blogMatch.params.id)
    : null;

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    dispatch(getUsers());
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

      <Routes>
        <Route path={'/blogs/:id'} element={<BlogPage blog={blogOnPage} />} />
        <Route path={'/users/:id'} element={<UserPage user={userOnPage} />} />
        <Route path={'/users'} element={<UsersPage />} />
        <Route path={'/'} element={<BlogsPage />} />
      </Routes>
    </div>
  );
}

export default App;
