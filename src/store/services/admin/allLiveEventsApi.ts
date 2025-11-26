import { baseApi } from "../baseApi";

// Seller type
export interface Seller {
  _id: string;
  fullName: string;
  img: string | null;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  isLoggedIn: boolean;
  wishlist?: string[];
  [key: string]: any; // fallback for extra fields
}

// Live Event type
export interface LiveEvent {
  _id: string;
  sellerId: Seller;
  title: string;
  description: string;
  startAt: string;
  durationMinutes: number;
  featuredProductIds: string[];
  status: string;
  promotionAddons: string[];
  paymentStatus: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  streamEmbedUrl: string;
  viewerCount?: number;
  thumbnailUrl?: string;
  appID?: number;
  hostToken?: string;
  roomId?: string;
  [key: string]: any; // fallback
}

// Full API response
export interface AllLiveEventResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: LiveEvent[];
}

export const liveEventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLiveEvents: builder.query<AllLiveEventResponse, void>({
      query: () => ({
        url: "/live-event/getAll",
        method: "GET",
      }),
      providesTags: ["LiveEvents"],
    }),
  }),
});

export const { useGetAllLiveEventsQuery } = liveEventsApi;
