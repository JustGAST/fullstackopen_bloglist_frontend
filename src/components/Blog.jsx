import {useState} from 'react';

function Blog({ blog, user, onLikeBlog, onRemoveBlog }) {
  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    padding: '5px',
    border: '1px solid black',
    margin: '5px 0'
  };

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide' : 'View'}</button>
      {expanded && (
        <>
          <div>{blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={onLikeBlog}>Like</button></div>
          <div>{blog.user && blog.user.name}</div>
          {user && blog.user && user.username === blog.user.username && (
            <button onClick={onRemoveBlog}>Remove</button>
          )}
        </>
      )}
    </div>
  );
}

export default Blog;
