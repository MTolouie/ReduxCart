import { createSlice } from "@reduxjs/toolkit";

const initialNotification = {
  title: null,
  status: null,
  message: null,
};
const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotification,
  reducers: {
    showNotification(state, action) {
      state.title = action.payload.title;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
