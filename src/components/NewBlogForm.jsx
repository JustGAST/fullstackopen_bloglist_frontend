import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

const NewBlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type={'string'}
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </Form.Group>
      <Button className={'my-2'} variant={'success'} type="submit">
        Save
      </Button>
    </Form>
  );
};

NewBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NewBlogForm;
