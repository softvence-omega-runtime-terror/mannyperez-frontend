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

    getLiveEventInfo: builder.query({
      query: (id) => ({
        url: `/live-event/info/${id}`,
        method: "GET",
      }),
      providesTags: ["LiveEvents"],
    }),

    startLiveStream: builder.mutation({
      query: (id) => ({
        url: `/live-event/stream/start/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["LiveEvents"],
    }),

    joinLiveStream: builder.mutation({
      query: (id) => ({
        url: `/live-event/stream/join/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["LiveEvents"],
    }),

    endLiveStream: builder.mutation({
      query: (id) => ({
        url: `/live-event/stream/end/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["LiveEvents"],
    }),

    getLiveEventInfoForHost: builder.query({
      query: (id) => ({
        url: `/live-event/stream/info/${id}`,
        method: "GET",
      }),
      providesTags: ["LiveEvents"],
    }),
  }),
});

export const {
  useCreateLiveStreamMutation,
  useGetLiveEventInfoQuery,
  useStartLiveStreamMutation,
  useJoinLiveStreamMutation,
  useEndLiveStreamMutation,
  useGetLiveEventInfoForHostQuery,
} = liveStreamApi;
