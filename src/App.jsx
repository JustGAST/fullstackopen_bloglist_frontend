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

  const handleLogin = (event) => {
    event.preventDefault();

    loginService.login({
      username, password
    }).then((data) => setUser(data))
      .catch((error) => console.log(error));
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
      <div>{user.username} logged in</div>
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
