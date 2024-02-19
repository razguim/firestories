import { apiSlice } from "./apiSlice";
const REPORTS_URL = "/api/reports";


export const storiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: () => ({
        url: `${REPORTS_URL}`,
      }),
      providesTags: ['Report'],
    }),
    getUserReports: builder.query({
      query: () => ({
        url: `${REPORTS_URL}/users`,
      }),
      providesTags: ["Reports"],
    }),
    getStoryReports: builder.query({
      query: () => ({
        url: `${REPORTS_URL}/stories`,
      }),
      providesTags: ["Reports"],
    }),
    reportStory: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/story`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    reportUser: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const {
  useGetReportsQuery,
  useGetStoryReportsQuery,
  useGetUserReportsQuery,
  useReportStoryMutation,
  useReportUserMutation,
} = storiesApiSlice;
