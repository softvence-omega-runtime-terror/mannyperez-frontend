

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import authSlice from '../slices/authSlice';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist ONLY auth slice
};


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      // getState only works AFTER store is created → so we define type after store
      const token = (getState() as RootState).auth?.token;

      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },

    credentials: "include",
  }),

  tagTypes: ["Products", "User", "Sellers", "Cart", "Orders", "LiveEvents"],

  endpoints: () => ({}),
});

const persistedAuthReducer = persistReducer(persistConfig, authSlice);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
