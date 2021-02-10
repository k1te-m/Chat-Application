import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    ADD_MESSAGE: () => {},
    MESSAGE_RECEIVED: (state, action) => {
      state.push({
        message: action.payload.message,
        username: action.payload.username,
      });
    },
  },
});

export const { ADD_MESSAGE, MESSAGE_RECEIVED } = messagesSlice.actions;

// Selector
export const selectMessages = (state) => state.messages;

export default messagesSlice.reducer;
