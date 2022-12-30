import {useState} from 'react';

const NewBlogForm = ({onSubmit}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title, author, url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
      <div>
        <label>
          Title
          <input type="string" name="title" value={title} onChange={({target}) => setTitle(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Author
          <input type="string" name="author" value={author} onChange={({target}) => setAuthor(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          URL
          <input type="string" name="url" value={url} onChange={({target}) => setUrl(target.value)}/>
        </label>
      </div>
      <div>
        <button type='submit'>Save</button>
      </div>
    </form>
  );
}

export default NewBlogForm;