import { baseApi } from "./baseApi";

const ChatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fileUpload: build.mutation({
      query: (data) => ({
        url: "chat/file-upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useFileUploadMutation } = ChatApi;
