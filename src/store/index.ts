
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import API services
import { baseApi } from "./services/baseApi";
import { sellersApi } from "./services/sellersApi";

// Import slices
import authReducer from "./slices/authSlice";
import selectedConversationReducer from "./slices/chatSlice";
import liveChatReducer from "./slices/live-stream-slice";

/**
 * Configure the Redux store
 */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    // RTK Query API reducers (single baseApi + standalone sellersApi)
    [baseApi.reducerPath]: baseApi.reducer,
    [sellersApi.reducerPath]: sellersApi.reducer,
    

    // Regular slices
    auth: persistedAuthReducer,
    selectedConversation: selectedConversationReducer,
    liveStreamConfig: liveChatReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      baseApi.middleware,
      sellersApi.middleware,
    ),

  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

// Setup listeners for RTK Query (enables refetchOnFocus and refetchOnReconnect)
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
