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

let timeoutId;
const showNotification = (message, type) => (dispatch) => {
  dispatch(setNotification({ message, type }));
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch(emptyNotification());
  }, 5000);
};

export const { setNotification, emptyNotification } =
  notificationReducer.actions;
export { showNotification };
export default notificationReducer.reducer;
