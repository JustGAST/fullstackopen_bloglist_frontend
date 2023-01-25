import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

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
    <form onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
      <div>
        <label>
          Title
          <input
            type="string"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Author
          <input
            type="string"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          URL
          <input
            type="string"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <div>
        <Button variant={'success'} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

NewBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NewBlogForm;
