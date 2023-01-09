import {useState} from 'react';

function Blog({ blog, onLikeBlog }) {
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
        </>
      )}
    </div>
  );
}

export default Blog;
