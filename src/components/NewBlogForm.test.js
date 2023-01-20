import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';
import { render } from '@testing-library/react';

test('<NewBlogForm /> calls onSumbit with valid params', async () => {
  const user = userEvent.setup();
  const onSubmitFn = jest.fn();

  const { container } = render(<NewBlogForm onSubmit={onSubmitFn} />);

  const titleInput = container.querySelector('[name=title]');
  await user.type(titleInput, 'test title');

  const authorInput = container.querySelector('[name=author]');
  await user.type(authorInput, 'test author');

  const urlInput = container.querySelector('[name=url]');
  await user.type(urlInput, 'test url');

  const submitButton = container.querySelector('[type=submit]');
  await user.click(submitButton);

  expect(onSubmitFn).toBeCalled();
  expect(onSubmitFn.mock.calls[0][0].title).toBe('test title');
  expect(onSubmitFn.mock.calls[0][0].author).toBe('test author');
  expect(onSubmitFn.mock.calls[0][0].url).toBe('test url');
});
