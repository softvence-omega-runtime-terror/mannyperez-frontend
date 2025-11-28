import type { RootState } from "../index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.accessToken;

      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },

    credentials: "include",
  }),

  tagTypes: ["Products", "User", "Sellers", "Cart", "Orders", "LiveEvents","Users", "Incidents", "pendingListings", "Profile"],

  endpoints: () => ({}),
});
