import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { showNotification } from './notificationReducer';

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return sortBlogsByLikes(action.payload);
    },
    addBlog(state, action) {
      return sortBlogsByLikes(state.concat(action.payload));
    },
  },
});

const sortBlogsByLikes = (blogs) => {
  blogs.sort((first, second) => first.likes - second.likes);

  return blogs;
};

const getBlogs = () => {
  return (dispatch) => {
    blogService.getAll().then((allBlogs) => {
      dispatch(setBlogs(allBlogs));
    });
  };
};

const createBlog = (blogData) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blogData);

    dispatch(
      showNotification(
        `A new blog ${blogData.title} by ${blogData.author} was added`,
        'success'
      )
    );
    dispatch(addBlog(newBlog));
  } catch (exception) {
    console.log(exception);
    dispatch(showNotification(exception.response.data.error, 'danger'));
  }
};

const likeBlog = (blog) => async (dispatch, getState) => {
  try {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    });

    let { blogs } = getState();

    dispatch(
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    );
  } catch (e) {
    console.log(e);
    dispatch(showNotification(`Error while liking blog ${e}`, 'danger'));
  }
};

const removeBlog = (blog) => async (dispatch, getState) => {
  try {
    await blogService.remove(blog);
    dispatch(
      showNotification(
        `Blog "${blog.title}" by ${blog.author} was successfully removed`,
        'success'
      )
    );

    let { blogs } = getState();
    dispatch(
      setBlogs(blogs.filter((existingBlog) => existingBlog.id !== blog.id))
    );
  } catch (e) {
    console.log(e);
    dispatch(showNotification(`Error while removing blog ${e}`, 'danger'));
  }
};

const commentBlog = (blog, comment) => async (dispatch, getState) => {
  const commentedBlog = await blogService.addComment(blog, comment);

  const { blogs } = getState();

  dispatch(
    setBlogs(
      blogs.map((blogCurrent) =>
        blogCurrent.id === blog.id ? commentedBlog : blogCurrent
      )
    )
  );
};

export const { setBlogs, addBlog } = blogReducer.actions;
export { getBlogs, createBlog, likeBlog, removeBlog, commentBlog };
export default blogReducer.reducer;
