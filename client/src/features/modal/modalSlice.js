import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    TOGGLE_MODAL: (state) => {
      return state ? false : true;
    },
  },
});

export const { TOGGLE_MODAL } = modalSlice.actions;

// Selector
export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
