import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "d-block",
};

export const sidebarSlice = createSlice({
  name: "sideBarToggle",
  initialState,
  reducers: {
    open: (state) => {
      state.value = "d-block";
    },
    close: (state) => {
      state.value = "d-none";
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = sidebarSlice.actions;

export default sidebarSlice.reducer;
