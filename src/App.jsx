import { useEffect, useState } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/blog';

function App() {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((allBlogs) => setBlogs(allBlogs));
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('loggedBlogsAppUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await loginService.login({
        username, password
      });

      localStorage.setItem('loggedBlogsAppUser', JSON.stringify(userData))
      setUser(userData);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
      alert(exception.response.data.error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogsAppUser');
    setUser(null);
  }

  if (user === null) {
    return (
      <div>
        <h1>Login to application</h1>
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
      <div>
        {user.name} logged in {' '}
        <button onClick={handleLogout}>Log out</button>
      </div>
      <br/>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default App;
