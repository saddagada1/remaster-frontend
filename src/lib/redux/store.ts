import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import remasterReducer from "./slices/remasterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    remaster: remasterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
