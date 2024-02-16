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
    setVerified(state, action: PayloadAction<boolean>) {
      if (!state.credentials) return;
      state.credentials = {
        ...state.credentials,
        user: { ...state.credentials.user, verified: action.payload },
      };
    },
    incrementTotalRemasters(state) {
      if (!state.credentials) return;
      state.credentials.user.totalRemasters += 1;
    },
    decrementTotalRemasters(state) {
      if (!state.credentials) return;
      state.credentials.user.totalRemasters -= 1;
    },
    incrementTotalFollowing(state) {
      if (!state.credentials) return;
      state.credentials.user.totalFollowing += 1;
    },
    decrementTotalFollowing(state) {
      if (!state.credentials) return;
      state.credentials.user.totalFollowing -= 1;
    },
    resetAuthState(state) {
      (state.status = "unauthenticated"),
        (state.credentials = initialState.credentials);
    },
  },
});

export const {
  setAuthState,
  setUser,
  setVerified,
  incrementTotalRemasters,
  decrementTotalRemasters,
  incrementTotalFollowing,
  decrementTotalFollowing,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
