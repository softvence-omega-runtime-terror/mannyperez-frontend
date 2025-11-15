/**
 * Redux Store Configuration
 *
 * This is the main store configuration file that combines all reducers
 * and middleware for the application.
 */

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Import API services
import { productsApi } from "./services/productsApi";
import { authApi } from "./services/authApi";
import { sellersApi } from "./services/sellersApi";

// Import slices
import authReducer from "./slices/authSlice";
import selectedConversationReducer from "./slices/chatSlice";

/**
 * Configure the Redux store
 */
export const store = configureStore({
  reducer: {
    // RTK Query API reducers
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [sellersApi.reducerPath]: sellersApi.reducer,
    

    // Regular slices
    auth: authReducer,
    selectedConversation: selectedConversationReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      productsApi.middleware,
      authApi.middleware,
      sellersApi.middleware,
      
    ),

  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

// Setup listeners for RTK Query (enables refetchOnFocus and refetchOnReconnect)
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
