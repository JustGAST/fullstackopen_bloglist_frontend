import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
  let container;

  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://google.com',
    likes: 0,
    user: {
      name: 'Test Author',
      username: 'test_author',
    },
  };

  const user = {
    username: 'test_author',
  };

  const onLikeBlogFn = jest.fn();
  const onRemoveBlogFn = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog
        onLikeBlog={onLikeBlogFn}
        onRemoveBlog={onRemoveBlogFn}
        blog={blog}
        user={user}
      />
    ).container;
  });

  test('renders title and author only', async () => {
    const element = screen.findByText(blog.title);
    expect(element).toBeDefined();

    const urlElement = container.querySelector('.blog-url');
    expect(urlElement).toBeNull();

    const likesElement = await screen.queryByText('Likes: ');
    expect(likesElement).toBeNull();
  });

  test('renders url and likes after pressing view button', async () => {
    const user = userEvent.setup();

    const viewButton = screen.getByText('View');
    await user.click(viewButton);

    const urlElement = container.querySelector('.blog-url');
    const likesElement = container.querySelector('.blog-likes');

    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
  });

  test('twice like click calls onLikeBlog twice', async () => {
    const user = userEvent.setup();

    const viewButton = screen.getByText('View');
    await user.click(viewButton);

    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(onLikeBlogFn).toBeCalledTimes(2);
  });
});
