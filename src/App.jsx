import { useEffect, useRef, useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const emptyNotification = { message: null, type: null }
  const [notification, setNotification] = useState(emptyNotification)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((allBlogs) => setSortedBlogsByLikes(allBlogs))
  }, [])

  useEffect(() => {
    const userData = localStorage.getItem('loggedBlogsAppUser')
    if (!userData) {
      return
    }

    const tokenData = JSON.parse(userData)
    setUser(tokenData)
    blogService.setToken(tokenData.token)
  }, [])

  const setSortedBlogsByLikes = (blogs) => {
    blogs.sort((first, second) => first.title > second.title ? 1 : -1)
    blogs.sort((first, second) => first.likes > second.likes ? 1 : -1)

    setBlogs(blogs)
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(emptyNotification)
    }, 5000)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const userData = await loginService.login({
        username, password
      })

      localStorage.setItem('loggedBlogsAppUser', JSON.stringify(userData))
      blogService.setToken(userData.token)
      setUser(userData)
    } catch (exception) {
      console.log(exception)
      showNotification(exception.response.data.error, 'danger')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
  }

  const handleNewBlogFormSubmit = async (blogData) => {
    try {
      const newBlog = await blogService.create(blogData)

      blogFormRef.current.toggleVisible()
      showNotification(`A new blog ${blogData.title} by ${blogData.author} was added`, 'success')
      setSortedBlogsByLikes(blogs.concat(newBlog))
    } catch (exception) {
      console.log(exception)
      showNotification(exception.response.data.error, 'danger')
    }
  }

  const likeBlog = (blog) => async () => {
    try {
      const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
      setSortedBlogsByLikes(
        blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog)
      )
    } catch (e) {
      console.log(e)
    }
  }

  const removeBlog = (blog) => async () => {
    try {
      if (!window.confirm(`Really remove blog ${blog.title} by ${blog.author}?`)) {
        return
      }

      await blogService.remove(blog)
      showNotification(`Blog "${blog.title}" by ${blog.author} was successfully removed`, 'success')
      setSortedBlogsByLikes(
        blogs.filter(existingBlog => existingBlog.id !== blog.id)
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      {notification.message && <Notification message={notification.message} type={notification.type}/>}
      <h1>Blogs</h1>
      {user === null && (
        <Togglable showButtonText={'Login'}>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}
      {user !== null && (
        <>
          <div>
            {user.name} logged in {' '}
            <button onClick={handleLogout}>Log out</button>
          </div>
          <Togglable showButtonText="Create new" ref={blogFormRef}>
            <NewBlogForm onSubmit={handleNewBlogFormSubmit} />
          </Togglable>
        </>
      )}
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} onLikeBlog={likeBlog(blog)} onRemoveBlog={removeBlog(blog)} />
        ))}
      </div>
    </div>
  )
}

export default App
