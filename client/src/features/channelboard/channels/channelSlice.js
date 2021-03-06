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
    channelPopulation: 0,
  },
  channelPopulations: [],
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
  reducers: {
    SET_POPULATION: (state, action) => {
      state.currentChannel.channelPopulation = action.payload.population;
    },
  },
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

// Actions
export const { SET_POPULATION } = channelSlice.actions;

// Selectors
export const selectChannel = (state) => state.channel;
export const selectAllChannels = (state) => state.channel.allChannels.channels;
export const selectAllChannelsLoading = (state) =>
  state.channel.allChannels.isLoading;
export const selectCurrentChannel = (state) =>
  state.channel.currentChannel.channel;
export const selectSetChannelLoading = (state) =>
  state.channel.currentChannel.isLoading;

export default channelSlice.reducer;
