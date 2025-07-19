import { baseApi } from "./baseApi";
import { TagType } from "./tag-type";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialties: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [TagType.specialties],
    }),
    getSpecialties: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: [TagType.specialties],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateSpecialtiesMutation, useGetSpecialtiesQuery } =
  specialtiesApi;
