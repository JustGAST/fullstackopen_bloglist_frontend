import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

import { likeBlog, removeBlog } from '../reducers/blogReducer';
import BlogComments from '../components/BlogPage/BlogComments';

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  if (!blog) {
    return;
  }

  const onRemoveBlog = () => {
    if (
      !window.confirm(`Really remove blog ${blog.title} by ${blog.author}?`)
    ) {
      return;
    }

    dispatch(removeBlog(blog));
    navigate('/');
  };

  const onLikeBlog = () => {
    dispatch(likeBlog(blog));
  };

  return (
    <>
      <Row className={'my-4'}>
        <Col>
          <h2>{blog.title}</h2>
        </Col>
      </Row>
      <Row className={'mb-4'}>
        <Col>
          <div className="blog-url">
            <a href={blog.url}>{blog.url}</a>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="blog-likes">
            Likes: {blog.likes}{' '}
            <Button className={'mx-2'} variant={'primary'} onClick={onLikeBlog}>
              Like
            </Button>
          </div>
        </Col>
        <Col className={'d-flex justify-content-end'}>
          <div className={'d-inline-block align-self-center'}>
            added by {blog.user && blog.user.name}
          </div>

          {user && blog.user && user.username === blog.user.username && (
            <Button
              variant={'outline-danger'}
              onClick={onRemoveBlog}
              className={'mx-2'}
            >
              Remove
            </Button>
          )}
        </Col>
      </Row>
      <Row className={'mt-4'}>
        <Col>
          <BlogComments blog={blog} />
        </Col>
      </Row>

      <Button variant={'link'} onClick={() => navigate(-1)}>
        back
      </Button>
    </>
  );
};

export default BlogPage;
