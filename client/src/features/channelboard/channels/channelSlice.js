import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../utils/API";

const initialState = {
  newChannel: {
    name: "",
    description: "",
    createdBy: "",
    isPending: false,
    error: null,
  },
  allChannels: {
    isLoading: false,
    channels: [],
  },
  currentChannel: {
    isLoading: false,
    channel: {},
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

export const setChannel = createAsyncThunk(
  "channel/setChannel",
  async (id, thunkAPI) => {
    const response = await API.getChannelByID(id);
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
      state.newChannel.error = "Channel name already in use.";
    },
    [setChannel.pending]: (state) => {
      state.currentChannel.isLoading = true;
    },
    [setChannel.fulfilled]: (state, action) => {
      state.currentChannel.isLoading = false;
      state.currentChannel.channel = action.payload;
    },
    [setChannel.rejected]: (state) => {
      localStorage.removeItem("channel");
      state.allChannels.isLoading = false;
    },
  },
});

// Selector
export const selectChannel = (state) => state.channel;
export const selectAllChannels = (state) => state.channel.allChannels.channels;
export const selectCurrentChannel = (state) =>
  state.channel.currentChannel.channel;

export default channelSlice.reducer;
