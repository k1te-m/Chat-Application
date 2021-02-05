import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../utils/API";

const initialState = {
  newChannel: {
    name: "",
    description: "",
    createdBy: "",
    isPending: false,
  },
  allChannels: {
    isLoading: false,
    channels: [],
  },
};

export const createChannel = createAsyncThunk(
  "channel/createChannel",
  async ({ name, description, createdBy }, thunkAPI) => {
    const response = await API.saveChannel({ name, description, createdBy });
    return response.data;
  }
);

export const loadChannels = createAsyncThunk(
  "channel/loadChannels",
  async (channel, thunkAPI) => {
    const response = await API.getChannels();
    return response.data;
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: {
    [loadChannels.pending]: (state) => {
      state.allChannels.isLoading = true;
    },
    [loadChannels.fulfilled]: (state, action) => {
      state.allChannels.isLoading = false;
      state.allChannels.channels = action.payload;
    },
    [loadChannels.rejected]: (state) => {
      state.allChannels.isLoading = false;
    },
    [createChannel.pending]: (state) => {
      state.newChannel.isPending = true;
    },
    [createChannel.fulfilled]: (state, action) => {
      state.newChannel.isPending = false;
      state.allChannels.channels.push(action.payload);
    },
    [createChannel.rejected]: (state) => {
      state.allChannels.isLoading = false;
    },
  },
});

// Selector
export const selectChannel = (state) => state.channel;
export const selectAllChannels = (state) => state.channel.allChannels.channels;

export default channelSlice.reducer;
