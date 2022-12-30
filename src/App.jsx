import { useEffect, useState } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';

function App() {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const emptyNotification = {message: null, type: null};
  const [notification, setNotification] = useState(emptyNotification);

  useEffect(() => {
    blogService.getAll().then((allBlogs) => setBlogs(allBlogs));
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('loggedBlogsAppUser');
    if (!userData) {
      return;
    }

    const tokenData = JSON.parse(userData);
    setUser(tokenData);
    blogService.setToken(tokenData.token)
  }, []);

  const showNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(emptyNotification);
    }, 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await loginService.login({
        username, password
      });

      localStorage.setItem('loggedBlogsAppUser', JSON.stringify(userData))
      blogService.setToken(userData.token);
      setUser(userData);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
      showNotification(exception.response.data.error, 'danger');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogsAppUser');
    setUser(null);
  }

  const handleNewBlogFormSubmit = async (blogData) => {
    try {
      const newBlog = await blogService.create(blogData);

      showNotification(`A new blog ${blogData.title} by ${blogData.author} was added`, 'success');
      setBlogs(blogs.concat(newBlog));
    } catch (exception) {
      console.log(exception);
      showNotification(exception.response.data.error, 'danger');
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Login to application</h1>
        {notification.message && <Notification message={notification.message} type={notification.type} />}
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input type="text" name="username" value={username} onChange={({target}) => setUsername(target.value)} />
            </label>
          </div>
          <div>
            <label>
              password
              <input type="password" name="password" value={password} onChange={({target}) => setPassword(target.value)} />
            </label>
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      {notification.message && <Notification message={notification.message} type={notification.type} />}
      <div>
        {user.name} logged in {' '}
        <button onClick={handleLogout}>Log out</button>
      </div>
      <br/>
      <NewBlogForm onSubmit={handleNewBlogFormSubmit} />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default App;
