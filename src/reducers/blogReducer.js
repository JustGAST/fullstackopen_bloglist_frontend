import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

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

export const { setBlogs, addBlog } = blogReducer.actions;
export { getBlogs };
export default blogReducer.reducer;
