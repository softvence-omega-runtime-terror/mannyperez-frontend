// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Matches backend payload shape and stays permissive to avoid runtime type errors
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

// LocalStorage helpers (guarded for SSR/sandbox)
const safeGetItem = (key: string) =>
  typeof window !== "undefined" ? window.localStorage.getItem(key) : null;

const safeSetItem = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
  }
};

const safeRemoveItem = (key: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};

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
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken?: string;
        approvalToken?: string;
        refreshToken?: string;
        token?: string;
      }>
    ) => {
      const {
        user,
        accessToken,
        approvalToken,
        refreshToken,
        token,
      } = action.payload;

      // Prefer explicit accessToken/approvalToken, fall back to generic token key
      state.accessToken = accessToken || approvalToken || token || null;
      state.refreshToken = refreshToken || null;
      state.user = user;
      state.isAuthenticated = Boolean(state.accessToken && state.user);

      // Persist manually to localStorage so refresh survives even if redux-persist fails
      if (state.accessToken) {
        safeSetItem("auth.accessToken", state.accessToken);
      }
      if (state.refreshToken) {
        safeSetItem("auth.refreshToken", state.refreshToken);
      }
      if (state.user) {
        safeSetItem("auth.user", JSON.stringify(state.user));
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

       // Clear manual localStorage copies
      safeRemoveItem("auth.accessToken");
      safeRemoveItem("auth.refreshToken");
      safeRemoveItem("auth.user");
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;

const readUserFromStorage = (): User | null => {
  try {
    const raw = safeGetItem("auth.user");
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

const readAccessTokenFromStorage = () => safeGetItem("auth.accessToken");
const readRefreshTokenFromStorage = () => safeGetItem("auth.refreshToken");

export const selectCurrentUser = (state: RootState["auth"]) =>
  state.user ?? readUserFromStorage();

export const selectAccessToken = (state: RootState["auth"]) =>
  state.accessToken ?? readAccessTokenFromStorage();

export const selectRefreshToken = (state: RootState["auth"]) =>
  state.refreshToken ?? readRefreshTokenFromStorage();

export const selectIsAuthenticated = (state: RootState["auth"]) =>
  state.isAuthenticated ||
  Boolean((state.user ?? readUserFromStorage()) && (state.accessToken ?? readAccessTokenFromStorage()));

export default authSlice.reducer;
