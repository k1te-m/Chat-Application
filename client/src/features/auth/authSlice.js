import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (user, thunkAPI) => {
    setAuthToken(localStorage.token);

    const response = await axios.get("/api/auth/user");
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, username, email, password }, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "/api/auth/register",
      { name, username, email, password },
      config
    );
    loadUser();
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "/api/auth/login",
      { email, password },
      config
    );
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGOUT: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [loginUser.rejected]: (state, action) => {
      localStorage.removeItem("token");
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    [loadUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [loadUser.rejected]: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { LOGOUT } = authSlice.actions;

// Selector
export const selectAuth = (state) => state.auth;
export const selectAuthUser = (state) => state.auth.user;

export default authSlice.reducer;
