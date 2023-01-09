import {useState} from 'react';

function Blog({ blog }) {
  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    padding: '5px',
    border: '1px solid black',
    margin: '5px 0'
  };

  console.log(blog);

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide' : 'View'}</button>
      {expanded && (
        <>
          <div>{blog.url}</div>
          <div>Likes: {blog.likes} <button>Like</button></div>
          <div>{blog.user && blog.user.name}</div>
        </>
      )}
    </div>
  );
}

export default Blog;
