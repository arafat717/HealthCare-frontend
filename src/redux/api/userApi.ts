import { baseApi } from "./baseApi";
import { TagType } from "./tag-type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [TagType.user],
    }),
  }),
});

export const { useGetSingleUserQuery } = userApi;
