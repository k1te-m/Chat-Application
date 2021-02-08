import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = [];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    SET_ALERT: (state, action) => {
      const id = uuid();
      state.push({
        message: action.payload.message,
        type: action.payload.type,
        id: id,
      });
    },
  },
});

export const { SET_ALERT } = alertSlice.actions;

// Selector
export const selectAlert = (state) => state.alert;

export default alertSlice.reducer;
