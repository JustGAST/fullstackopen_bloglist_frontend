import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes, useMatch } from 'react-router-dom';

import Notification from './components/Notification';
import { getBlogs } from './reducers/blogReducer';
import { checkIfUserLoggedIn, logout } from './reducers/userReducer';
import BlogsPage from './pages/BlogsPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import { getUsers } from './reducers/usersReducer';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';

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

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(checkIfUserLoggedIn());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <h1>Blogs</h1>

      <nav className={'nav'}>
        <Link to={'/'}>Blogs</Link>
        <Link to={'/users'}>Users</Link>
        {user === null && <Link to={'/login'}>Login</Link>}
        {user !== null && (
          <div style={{ display: 'inline-block' }}>
            {user.name} logged in{' '}
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </nav>

      <Routes>
        <Route path={'/blogs/:id'} element={<BlogPage blog={blogOnPage} />} />
        <Route path={'/users/:id'} element={<UserPage user={userOnPage} />} />
        <Route path={'/users'} element={<UsersPage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/'} element={<BlogsPage />} />
      </Routes>
    </div>
  );
}

export default App;
