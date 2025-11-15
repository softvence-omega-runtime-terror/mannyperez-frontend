import { baseApi } from "./baseApi";

export const liveStreamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLiveStream: builder.mutation({
      query: (payload) => ({
        url: `/live-event/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["LiveEvents"],
    }),
  }),
});

export const { useCreateLiveStreamMutation } = liveStreamApi;
