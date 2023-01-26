import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserPage = ({ user }) => {
  if (!user) {
    return;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default UserPage;
