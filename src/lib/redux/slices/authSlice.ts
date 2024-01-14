import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserResponse } from "@/model";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface Credentials {
  accessToken: string;
  expiresAt: number;
  user: UserResponse;
}

interface AuthState {
  status: AuthStatus;
  credentials: Credentials | null;
}

const initialState: AuthState = {
  status: "loading",
  credentials: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<AuthState>) {
      (state.status = action.payload.status),
        (state.credentials = action.payload.credentials);
    },
    setUser(state, action: PayloadAction<{ user: UserResponse }>) {
      if (!state.credentials) return;
      state.credentials = { ...state.credentials, user: action.payload.user };
    },
    resetAuthState(state) {
      (state.status = "unauthenticated"),
        (state.credentials = initialState.credentials);
    },
  },
});

export const { setAuthState, setUser, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
