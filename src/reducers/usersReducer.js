import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersReducer.actions;

const getUsers = () => async (dispatch) => {
  const users = await usersService.getAll();

  dispatch(setUsers(users));
};

export { getUsers };
export default usersReducer.reducer;
