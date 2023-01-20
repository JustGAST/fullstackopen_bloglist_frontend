import { createSlice } from '@reduxjs/toolkit';

const initialState = { message: null, type: null };

const notificationReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    emptyNotification() {
      return initialState;
    },
  },
});

export const { setNotification, emptyNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;
