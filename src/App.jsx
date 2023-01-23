import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { createBlog, getBlogs } from './reducers/blogReducer';
import { checkIfUserLoggedIn, login, logout } from './reducers/userReducer';
import BlogsPage from './pages/BlogsPage';
import UsersPage from './pages/UsersPage';

function App() {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);
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
        <Route path={'/users'} element={<UsersPage />} />
        <Route path={'/'} element={<BlogsPage />} />
      </Routes>
    </div>
  );
}

export default App;
