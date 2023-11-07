import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("loginFeature") ? true : false,
};

export const loginSlice = createSlice({
  name: "loginFeature",
  initialState,
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
