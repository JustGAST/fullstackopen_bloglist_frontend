import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../../reducers/blogReducer';

const BlogCommentForm = ({ blog }) => {
  const dispatch = useDispatch();

  const handleCommentBlog = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = '';
    dispatch(commentBlog(blog, comment));
  };

  return (
    <Form onSubmit={handleCommentBlog} className={'mb-3'}>
      <InputGroup>
        <Form.Control placeholder={'comment'} name={'comment'} />
        <Button variant={'outline-primary'}>Save</Button>
      </InputGroup>
    </Form>
  );
};

export default BlogCommentForm;
