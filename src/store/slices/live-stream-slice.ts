import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LiveConfigState {
  appID: string | number | null;
  roomId: string | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const LOCAL_STORAGE_KEY = "liveConfig";

const initialState: LiveConfigState = (() => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!serializedState)
      return {
        appID: null,
        roomId: null,
        token: null,
        isLoading: false,
        error: null,
      };
    return JSON.parse(serializedState);
  } catch {
    return {
      appID: null,
      roomId: null,
      token: null,
      isLoading: false,
      error: null,
    };
  }
})();

const saveToLocalStorage = (state: LiveConfigState) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.error("Error saving live config to local storage");
  }
};

const liveConfigSlice = createSlice({
  name: "liveConfig",
  initialState,
  reducers: {
    setLiveConfig: (
      state,
      action: PayloadAction<{
        appID: string | number;
        roomId: string;
        token: string;
      }>
    ) => {
      state.appID = action.payload.appID;
      state.roomId = action.payload.roomId;
      state.token = action.payload.token;
      state.error = null;
      saveToLocalStorage(state);
    },
    clearLiveConfig: (state) => {
      state.appID = null;
      state.roomId = null;
      state.token = null;
      state.error = null;
      state.isLoading = false;
      saveToLocalStorage(state);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      saveToLocalStorage(state);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      saveToLocalStorage(state);
    },
  },
});

export const { setLiveConfig, clearLiveConfig, setLoading, setError } =
  liveConfigSlice.actions;
export default liveConfigSlice.reducer;
