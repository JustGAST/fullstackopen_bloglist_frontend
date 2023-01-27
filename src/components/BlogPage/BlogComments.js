import BlogCommentForm from './BlogCommentForm';
import { ListGroup } from 'react-bootstrap';

const BlogComments = ({ blog }) => {
  return (
    <>
      <h4>Comments</h4>

      <BlogCommentForm blog={blog} />
      {blog.comments.length === 0 && <div>No comments yet</div>}
      {blog.comments.length > 0 && (
        <ListGroup>
          {blog.comments.map((comment) => (
            <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default BlogComments;
