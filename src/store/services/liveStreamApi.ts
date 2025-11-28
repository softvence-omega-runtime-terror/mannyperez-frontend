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

    getMyLiveEvents: builder.query({
      query: () => ({
        url: `/live-event/getMyEvents`,
        method: "GET",
      }),
      providesTags: ["LiveEvents"],
    }),

    updateLiveEvent: builder.mutation({
      query: ({ payload, eventId }) => ({
        url: `/live-event/update/${eventId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["LiveEvents"],
    }),
    getAllLiveEvents: builder.query({
      query: ({ status }) => ({
        url: "/live-event/getAll",
        method: "GET",
        params: { filter: status },
      }),
      providesTags: ["LiveEvents"],
    }),

    bookLiveEvent: builder.mutation({
      query: (eventId) => ({
        url: `/live-event/book/${eventId}`,
        method: "POST",
      }),
      invalidatesTags: ["LiveEvents"],
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
  useGetMyLiveEventsQuery,
  useUpdateLiveEventMutation,
  useGetAllLiveEventsQuery,
  useBookLiveEventMutation,
} = liveStreamApi;
