import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// User interface
export interface User {
  _id?: string;
  id?: string;
  email?: string;
  name?: string;
  fullName?: string;
  role?: string;
  img?: string | null;
  isDeleted?: boolean;
  isBlocked?: boolean;
  isLoggedIn?: boolean;
  isVerified?: boolean;
  agreedToTerms?: boolean;
  following?: string[];
  savedProducts?: string[];
  wishlist?: string[];
  recentLoginDevices?: string[];
  twoFactorAuthEnabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// LocalStorage helpers
const safeGetItem = (key: string) =>
  typeof window !== "undefined" ? window.localStorage.getItem(key) : null;

const safeSetItem = (key: string, value: string) => {
  if (typeof window !== "undefined") window.localStorage.setItem(key, value);
};

const safeRemoveItem = (key: string) => {
  if (typeof window !== "undefined") window.localStorage.removeItem(key);
};

// Bootstrap auth state
const bootstrapAuth = (): AuthState => {
  try {
    const storedUser = safeGetItem("auth.user");
    const accessToken = safeGetItem("auth.accessToken");
    const refreshToken = safeGetItem("auth.refreshToken");

    const user = storedUser ? (JSON.parse(storedUser) as User) : null;
    const isAuthenticated = Boolean(user && accessToken);

    return {
      user,
      accessToken,
      refreshToken,
      isAuthenticated,
      isLoading: false,
    };
  } catch {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }
};

const initialState: AuthState = bootstrapAuth();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login / Signup
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken?: string;
        refreshToken?: string;
        token?: string;
        approvalToken?: string;
      }>
    ) => {
      const { user, accessToken, refreshToken, token, approvalToken } =
        action.payload;

      state.user = user;
      state.accessToken = accessToken || approvalToken || token || null;
      state.refreshToken = refreshToken || null;
      state.isAuthenticated = Boolean(state.user && state.accessToken);

      if (state.user) safeSetItem("auth.user", JSON.stringify(state.user));
      if (state.accessToken) safeSetItem("auth.accessToken", state.accessToken);
      if (state.refreshToken) safeSetItem("auth.refreshToken", state.refreshToken);
    },

    // Update user partially (image, name, bio, etc.)
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        safeSetItem("auth.user", JSON.stringify(state.user));
      }
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      safeRemoveItem("auth.user");
      safeRemoveItem("auth.accessToken");
      safeRemoveItem("auth.refreshToken");
    },
  },
});

// Selectors
export const selectCurrentUser = (state: RootState["auth"]) =>
  state.user ??
  (safeGetItem("auth.user")
    ? JSON.parse(safeGetItem("auth.user")!)
    : null);

export const selectAccessToken = (state: RootState["auth"]) =>
  state.accessToken ?? safeGetItem("auth.accessToken");

export const selectRefreshToken = (state: RootState["auth"]) =>
  state.refreshToken ?? safeGetItem("auth.refreshToken");

export const selectIsAuthenticated = (state: RootState["auth"]) =>
  state.isAuthenticated ||
  Boolean(
    (state.user ??
      (safeGetItem("auth.user")
        ? JSON.parse(safeGetItem("auth.user")!)
        : null)) &&
      (state.accessToken ?? safeGetItem("auth.accessToken"))
  );

export const { setCredentials, updateUser, logout } = authSlice.actions;

export default authSlice.reducer;
