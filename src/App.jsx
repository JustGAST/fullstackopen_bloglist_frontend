import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Routes, useMatch } from 'react-router-dom';

import Notification from './components/Notification';
import { getBlogs } from './reducers/blogReducer';
import { checkIfUserLoggedIn, logout } from './reducers/userReducer';
import BlogsPage from './pages/BlogsPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import { getUsers } from './reducers/usersReducer';
import BlogPage from './pages/BlogPage';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import LoginModal from './pages/modals/LoginModal';

function App() {
  const dispatch = useDispatch();
  const userMatch = useMatch('/users/:id');
  const blogMatch = useMatch('/blogs/:id');

  const [showLoginModal, setShowLoginModal] = useState(false);

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
    <>
      <Navbar bg={'light'} expand={'lg'} className={'mb-2'}>
        <Container>
          <Navbar.Brand>Blogs</Navbar.Brand>
          <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
          <Navbar.Collapse id={'basic-navbar-nav'}>
            <Nav className={'me-auto'}>
              <Nav.Link as={'span'}>
                <NavLink to={'/'}>Blogs</NavLink>
              </Nav.Link>
              <Nav.Link as={'span'}>
                <NavLink to={'/users'}>Users</NavLink>
              </Nav.Link>
              {user === null && (
                <Nav.Link as={'span'}>
                  <a href={'#'} onClick={() => setShowLoginModal(true)}>
                    Login
                  </a>
                </Nav.Link>
              )}
            </Nav>
            {user !== null && (
              <Navbar.Text>
                <Nav.Item>
                  {user.name} logged in{' '}
                  <Button variant={'link'} onClick={handleLogout}>
                    Log out
                  </Button>
                </Nav.Item>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />

      <Container>
        <Row>
          <Col>
            {notification.message && (
              <Notification
                message={notification.message}
                type={notification.type}
              />
            )}

            <Routes>
              <Route
                path={'/blogs/:id'}
                element={<BlogPage blog={blogOnPage} />}
              />
              <Route
                path={'/users/:id'}
                element={<UserPage user={userOnPage} />}
              />
              <Route path={'/users'} element={<UsersPage />} />
              <Route path={'/'} element={<BlogsPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
