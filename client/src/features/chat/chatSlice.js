import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    ADD_MESSAGE: (state, action) => {
      state.messages.push({
        message: action.payload.message,
        author: action.payload.author,
      });
    },
    SEND_MESSAGE: (state) => {
      return state;
    },
  },
});

export const { ADD_MESSAGE, SEND_MESSAGE } = chatSlice.actions;

// Selector
export const selectChat = (state) => state.chat;

export default chatSlice.reducer;
