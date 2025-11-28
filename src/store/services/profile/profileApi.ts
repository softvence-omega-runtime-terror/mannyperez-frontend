import { baseApi } from "../baseApi";

export interface IUser {
  _id: string;
  name: string;
  userName: string;
  phone: string;
  email: string;
  role: string;
  isVerified: boolean;
  img: string;
  fullName: string;
  bio: string;
  updatedAt: string;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // GET SINGLE USER
    getUserById: build.query<{ data: IUser }, string>({
      query: (id) => `/users/getSingleUser/${id}`,
      providesTags: ["Profile"],
    }),

    // UPDATE PROFILE DATA
    updateProfileData: build.mutation({
      query: (data) => ({
        url: `/users/updateProfileData`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    // UPDATE / UPLOAD PROFILE IMAGE
    updateProfileImage: build.mutation({
      query: (formData: FormData) => ({
        url: `/users/uploadOrChangeImg`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateProfileDataMutation,
  useUpdateProfileImageMutation,
} = profileApi;
