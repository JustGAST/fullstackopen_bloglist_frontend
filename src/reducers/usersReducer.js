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

const getAll = () => async (dispatch) => {
  const users = await usersService.getAll();

  dispatch(setUsers(users));
};

export { getAll };
export default usersReducer.reducer;
