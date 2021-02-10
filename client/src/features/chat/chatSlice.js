import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";
import axios from "axios";

const initialState = {
  isLoading: false,
  messages: [],
};

export const loadMessages = createAsyncThunk(
  "chat/loadMessages",
  async (channelID, thunkAPI) => {
    const response = await axios.get("/api/messages/" + channelID);
    return response.data;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    ADD_MESSAGE: (state, action) => {
      state.messages.push({
        message: action.payload.message,
        username: action.payload.username,
        channel: action.payload.channel,
      });
    },
    SEND_MESSAGE: (state) => {
      return state;
    },
  },
  extraReducers: {
    [loadMessages.pending]: (state) => {
      state.isLoading = true;
    },
    [loadMessages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    },
    [loadMessages.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { ADD_MESSAGE, SEND_MESSAGE } = chatSlice.actions;

// Selector
export const selectChatMessages = (state) => state.chat;

export default chatSlice.reducer;
