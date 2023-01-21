import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { showNotification } from './notificationReducer';

const userReducer = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    checkIfUserLoggedIn() {
      const userData = localStorage.getItem('loggedBlogsAppUser');
      if (!userData) {
        return;
      }

      const tokenData = JSON.parse(userData);
      blogService.setToken(tokenData.token);

      return tokenData;
    },
    logout() {
      localStorage.removeItem('loggedBlogsAppUser');
      return null;
    },
  },
});

const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const userData = await loginService.login({
        username,
        password,
      });

      localStorage.setItem('loggedBlogsAppUser', JSON.stringify(userData));
      blogService.setToken(userData.token);
      dispatch(setUser(userData));
    } catch (exception) {
      console.log(exception);
      dispatch(showNotification(exception.response.data.error, 'danger'));
    }
  };

export const { setUser, checkIfUserLoggedIn, logout } = userReducer.actions;
export { login };
export default userReducer.reducer;
