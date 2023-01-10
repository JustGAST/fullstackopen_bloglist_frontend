import { useState } from 'react'
import PropTypes from 'prop-types'

function Blog({ blog, user, onLikeBlog, onRemoveBlog }) {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    padding: '5px',
    border: '1px solid black',
    margin: '5px 0'
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide' : 'View'}</button>
      {expanded && (
        <>
          <div className='blog-url'>{blog.url}</div>
          <div className='blog-likes'>Likes: {blog.likes} <button onClick={onLikeBlog}>Like</button></div>
          <div>{blog.user && blog.user.name}</div>
          {user && blog.user && user.username === blog.user.username && (
            <button onClick={onRemoveBlog}>Remove</button>
          )}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }),
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  onLikeBlog: PropTypes.func.isRequired,
  onRemoveBlog: PropTypes.func.isRequired,
}

export default Blog
