import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/LoginFeature/loginSlice";
import sideBarReducer from "./features/sidebarSlice";

export const store = configureStore({
  reducer: {
    loginFeature: loginReducer,
    sideBarReducer: sideBarReducer,
  },
});
